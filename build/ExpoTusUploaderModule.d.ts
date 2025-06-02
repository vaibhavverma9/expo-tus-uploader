import { NativeModule } from 'expo';
import { ExpoTusUploaderModuleEvents } from './ExpoTusUploader.types';
declare class ExpoTusUploaderModule extends NativeModule<ExpoTusUploaderModuleEvents> {
    PI: number;
    hello(): string;
    setValueAsync(value: string): Promise<void>;
}
declare const _default: ExpoTusUploaderModule;
export default _default;
//# sourceMappingURL=ExpoTusUploaderModule.d.ts.map