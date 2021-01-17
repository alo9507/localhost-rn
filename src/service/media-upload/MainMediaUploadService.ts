import MediaUploadService from './MediaUploadService';
import { Platform } from 'react-native';

class MainMediaUploadService implements MediaUploadService {
  constructor() {}

  upload(uri: string): Promise<string> {
    const promise: Promise<string> = new Promise(async (resolve, reject) => {
      const apiUrl = 'http://localhost:80/media/upload';

      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();
      const uploadUri = Platform.OS === 'android' ? uri : uri.replace('file://', '');
      const fileObject: any = {
        uri: uploadUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`
      };
      formData.append('file', fileObject);
      const options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      };

      fetch(apiUrl, options)
        .then((res) => res.json())
        .then((res) => {
          resolve(res.location);
        })
        .catch((e) => {
          reject('Error uploading image: ', e);
        });
    });
    return promise;
  }
}

export default MainMediaUploadService;
