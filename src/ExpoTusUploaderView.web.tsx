import * as React from 'react';

import { ExpoTusUploaderViewProps } from './ExpoTusUploader.types';

export default function ExpoTusUploaderView(props: ExpoTusUploaderViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
