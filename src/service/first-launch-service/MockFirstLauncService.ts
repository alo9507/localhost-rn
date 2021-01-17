import FirstLaunchService from './FirstLaunchService';

class MockFirstLaunchService implements FirstLaunchService {
  alwaysFirstLaunch;

  constructor(alwaysFirstLaunch) {
    this.alwaysFirstLaunch = alwaysFirstLaunch;
  }
  isFirstLaunch(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise(async (resolve, _) => {
      if (this.alwaysFirstLaunch) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    return promise;
  }
}

export default MockFirstLaunchService;
