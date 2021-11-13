import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { FileSystemUploadType } from 'expo-file-system';
import Constants from 'expo-constants';

// @ts-ignore
const { BACKEND_ENDPOINT } = Constants.manifest?.extra;

async function getMedia(key: string) {
  return axios
    .get(`${BACKEND_ENDPOINT}/api/v1/storage/media/${key}`)
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
    `${BACKEND_ENDPOINT}/api/v1/storage/media`,
    uri,
    options
  ).catch((err) => {
    console.log(`[POST] for upload failed. ${err}`);
    throw err;
  });
}

export { getMedia, uploadMedia };
