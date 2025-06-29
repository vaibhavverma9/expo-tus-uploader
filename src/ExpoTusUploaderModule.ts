import { NativeModule, requireNativeModule } from 'expo';

import { ExpoTusUploaderModuleEvents } from './ExpoTusUploader.types';

declare class ExpoTusUploaderModule extends NativeModule<ExpoTusUploaderModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoTusUploaderModule>('ExpoTusUploader');
