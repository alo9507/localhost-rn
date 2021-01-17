interface MediaUploadService {
  upload(uri: string): Promise<string>;
}

export default MediaUploadService;
