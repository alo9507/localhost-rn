import MediaUploadService from "./MediaUploadService";

class MainMediaUploadService implements MediaUploadService {
    constructor () { }
    upload(uri: string): Promise<string> {
        let promise: Promise<string> = new Promise(async (resolve, reject) => {
            try {

                resolve(true)
            } catch (e) {
                reject(e)
            }
        });
        return promise
    }
}

export default MainMediaUploadService