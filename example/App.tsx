import React from 'react';
import { Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { upload } from 'expo-tus-uploader';

export default function App({
  videoId,
  handleProgress
}) {
  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    try {
      const response = await upload(
        uri,
        'https://boiling-temple-07591-774b277da223.herokuapp.com/uploads',
        {
          filename: 'video.mp4',
          filetype: 'video/mp4',
          uploadId: videoId,
        },
        (sent, total) => {
          const progress = sent / total;
          handleProgress(progress)
        }
      );
      console.log('✅ Upload completed:', response);
    } catch (err) {
      console.error('🚫 Upload failed:', err);
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Upload Video with TUSKit" onPress={handleUpload} />
    </View>
  );
}
