import BackgroundGeolocation from 'react-native-background-geolocation';
// import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';

class LocationService {
  registeredEvents = [];

  constructor() {
    this.register();
  }

  register = () => {
    this.on('geofence', this.onGeofence);

    BackgroundGeolocation.configure({
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      loiteringDelay: 5000,
      // Application config
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    }, (state) => {
      // console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          // console.log('- Start success');
        });
      }
    });
  };

  unregister = () => {
    this.registeredEvents.forEach(event => BackgroundGeolocation.un(event.key, event.cb));
  };

  destroy = () => {
    this.unregister();
    BackgroundGeolocation.removeGeofences();
  };

  onGeofence = (geofence) => {
    BackgroundGeolocation.addGeofence(geofence);
  };

  notify = ({ title, message, okAction, okText = 'More info', cancelAction, cancelText = 'Cancel' }) => {
    Alert.alert(
      title,
      message,
      [
        { text: cancelText, onPress: cancelAction, style: 'cancel' },
        { text: okText, onPress: okAction },
      ]
    );
  };

  addGeofence = async (geofence) => await new Promise(resolve => BackgroundGeolocation.addGeofence(geofence, resolve));

  getGeoFences = async () => await new Promise(resolve => BackgroundGeolocation.getGeofences(resolve));

  on = (key, cb) => {
    BackgroundGeolocation.on(key, cb, console.error);
    this.registeredEvents.push({ key, cb });
  }
}

export default LocationService;

