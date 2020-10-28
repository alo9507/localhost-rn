import AsyncStorage from "@react-native-community/async-storage";

class AsyncStorageFirstLaunchService implements AuthDataStore {
    constructor() { }
    async isFirstLaunch(): Promise<boolean> {
        let promise = new Promise(async (resolve, reject) => {
            try {
                const firstLaunchToken = await AsyncStorage.getItem("@firstLaunchToken");
                if (firstLaunchToken != null) { resolve(false) }
                await AsyncStorage.setItem("@firstLaunchToken", JSON.stringify({ isFirstLaunch: false }));
                resolve(true)
            } catch (e) {
                reject(e)
            }
        });
        return promise
    }
}

export default AsyncStorageFirstLaunchService