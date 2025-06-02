import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoTusUploaderViewProps } from './ExpoTusUploader.types';

const NativeView: React.ComponentType<ExpoTusUploaderViewProps> =
  requireNativeView('ExpoTusUploader');

export default function ExpoTusUploaderView(props: ExpoTusUploaderViewProps) {
  return <NativeView {...props} />;
}
