import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from 'expo-file-system';

async function requestVerification(uri: string, token: string) {
  const options = {
    headers: { 'auth-token': token },
    uploadType: FileSystemUploadType.MULTIPART,
    fieldName: 'gov-id',
  };

  return FileSystem.uploadAsync(
    'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/self/request-verification',
    uri,
    options
  ).catch((err) => {
    console.log('Post operation for upload failed. ' + err);
    throw err;
  });
}

export default requestVerification;
