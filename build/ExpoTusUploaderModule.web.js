import { registerWebModule, NativeModule } from 'expo';
class ExpoTusUploaderModule extends NativeModule {
    PI = Math.PI;
    async setValueAsync(value) {
        this.emit('onChange', { value });
    }
    hello() {
        return 'Hello world! 👋';
    }
}
export default registerWebModule(ExpoTusUploaderModule, 'ExpoTusUploaderModule');
//# sourceMappingURL=ExpoTusUploaderModule.web.js.map