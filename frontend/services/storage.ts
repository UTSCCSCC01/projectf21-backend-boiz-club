import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from 'expo-file-system';

async function getMedia(key: string) {
  return axios
    .get(
      `https://pawsup-dev-oznda.ondigitalocean.app/api/v1/storage/media/${key}`
    )
    .catch((err) => {
      console.log(`[GET] for media failed: ${err}`);
      throw err;
    });
}

async function uploadMedia(uri: string) {
  const options = {
    uploadType: FileSystemUploadType.MULTIPART,
    fieldName: 'media',
  };

  return FileSystem.uploadAsync(
    'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/storage/media',
    uri,
    options
  ).catch((err) => {
    console.log(`[POST] for upload failed. ${err}`);
    throw err;
  });
}

export { getMedia, uploadMedia };
