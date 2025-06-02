import { registerWebModule, NativeModule } from 'expo';

import { ExpoTusUploaderModuleEvents } from './ExpoTusUploader.types';

class ExpoTusUploaderModule extends NativeModule<ExpoTusUploaderModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoTusUploaderModule, 'ExpoTusUploaderModule');
