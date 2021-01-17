import Location from './Location';
import LocationPermissionResponse from './LocationPermissionResponse';

interface LocationManager {
  requestLocationPermission(): Promise<LocationPermissionResponse>;
  getLocation(): Promise<Location>;
}

export default LocationManager;
