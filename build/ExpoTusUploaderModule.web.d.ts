import { NativeModule } from 'expo';
import { ExpoTusUploaderModuleEvents } from './ExpoTusUploader.types';
declare class ExpoTusUploaderModule extends NativeModule<ExpoTusUploaderModuleEvents> {
    PI: number;
    setValueAsync(value: string): Promise<void>;
    hello(): string;
}
declare const _default: typeof ExpoTusUploaderModule;
export default _default;
//# sourceMappingURL=ExpoTusUploaderModule.web.d.ts.map