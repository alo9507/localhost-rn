import Location from './Location';
import LocationManager from './LocationManager';
import LocationPermissionResponse from './LocationPermissionResponse';
import * as ExpoLocation from 'expo-location';

class ExpoLocationManager implements LocationManager {
  constructor() {}
  async requestLocationPermission(): Promise<LocationPermissionResponse> {
    const { status } = await ExpoLocation.requestPermissionsAsync();
    return new LocationPermissionResponse(status);
  }
  async getLocation(): Promise<Location> {
    const location = await ExpoLocation.getCurrentPositionAsync({});
    return new Location(location.coords.latitude, location.coords.longitude);
  }
}

export default ExpoLocationManager;
