import { NativeModules, NativeEventEmitter } from 'react-native';

const TusUploader = NativeModules.ExpoTusUploader;

const emitter = new NativeEventEmitter(TusUploader);

export function upload(
  uri: string,
  endpoint: string,
  metadata?: Record<string, string>,
  onProgress?: (sent: number, total: number) => void
) {
  if (!TusUploader) throw new Error('ExpoTusUploader native module not found.');

  const sub = onProgress
    ? emitter.addListener('TusUploadProgress', ({ bytesSent, bytesTotal }) => {
        onProgress(bytesSent, bytesTotal);
      })
    : null;

  return TusUploader.upload(uri, endpoint, metadata).finally(() => {
    if (sub) sub.remove();
  });
}
