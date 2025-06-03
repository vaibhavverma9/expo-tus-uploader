const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withTusKitPodfile(config) {
  return withDangerousMod(config, [
    'ios',
    (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf-8');

      if (!contents.includes('use_frameworks! :linkage => :static')) {
        contents = contents.replace(
          /use_expo_modules!\n/,
          `use_expo_modules!\n  use_frameworks! :linkage => :static\n`
        );
      }

      if (!contents.includes("config.build_settings['SWIFT_VERSION'] = '5.0'")) {
        contents = contents.replace(
          /post_install do \|installer\|([\s\S]*?)react_native_post_install\(([\s\S]*?)\)\n/,
          `post_install do |installer|\n  react_native_post_install(\n    \\2\n  )\n\n  installer.pods_project.targets.each do |target|\n    target.build_configurations.each do |config|\n      config.build_settings['SWIFT_VERSION'] = '5.0'\n    end\n  end\n`
        );
      }

      fs.writeFileSync(podfilePath, contents);
      return config;
    },
  ]);
};
