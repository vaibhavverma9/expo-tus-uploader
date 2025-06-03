const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withTusKitPodfile(config) {
  return withDangerousMod(config, [
    'ios',
    (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf-8');

      // Add TUSKit pod inside the target block if missing
      if (!contents.includes(`pod 'TUSKit'`)) {
        contents = contents.replace(
          /target ['"][^'"]+['"] do\n/,
          match => `${match}  pod 'TUSKit', :git => 'https://github.com/tus/TUSKit.git', :tag => '3.5.0'\n`
        );
      }

      // Ensure use_frameworks! is inserted after use_expo_modules!
      if (!contents.includes('use_frameworks! :linkage => :static')) {
        contents = contents.replace(
          /use_expo_modules!\n/,
          `use_expo_modules!\n  use_frameworks! :linkage => :static\n`
        );
      }

      // Set Swift version - Fixed approach
      if (!contents.includes("config.build_settings['SWIFT_VERSION'] = '5.4'")) {
        // Find the post_install block and add Swift version configuration
        const postInstallRegex = /(post_install do \|installer\|[\s\S]*?)(react_native_post_install\([\s\S]*?\))/;
        const match = contents.match(postInstallRegex);
        
        if (match) {
          const beforeReactNative = match[1];
          const reactNativeCall = match[2];
          
          const replacement = `${beforeReactNative}${reactNativeCall}

    # Set Swift version for all targets
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['SWIFT_VERSION'] = '5.4'
      end
    end`;
          
          contents = contents.replace(postInstallRegex, replacement);
        }
      }

      fs.writeFileSync(podfilePath, contents);
      return config;
    },
  ]);
};