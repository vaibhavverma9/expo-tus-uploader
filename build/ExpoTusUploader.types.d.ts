import type { StyleProp, ViewStyle } from 'react-native';
export type OnLoadEventPayload = {
    url: string;
};
export type ExpoTusUploaderModuleEvents = {
    onChange: (params: ChangeEventPayload) => void;
};
export type ChangeEventPayload = {
    value: string;
};
export type ExpoTusUploaderViewProps = {
    url: string;
    onLoad: (event: {
        nativeEvent: OnLoadEventPayload;
    }) => void;
    style?: StyleProp<ViewStyle>;
};
//# sourceMappingURL=ExpoTusUploader.types.d.ts.map