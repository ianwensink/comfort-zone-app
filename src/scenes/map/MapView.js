import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView, connectToRemote } from 'react-native-webview-messaging';
import heatmap from '../../../ios/assets/heatmap/build/index.html';
import LocationService from '../../hoc/WatchPositionHOC/LocationService';

import WatchPositionHoc from '../../hoc/WatchPositionHOC';
import fetch from "../../lib/fetch";

class MapView extends Component {
  static componentName = 'MapView';

  async componentDidMount() {
    this.locationService = new LocationService();
    this.locationService.on('geofence', this.onGeofence);
    // this.locationService.destroy();

    this.setUpMsgChannel();

    const json = await fetch(`${process.env.SERVER_ADDR}/heatmap`);
    await this.processEvents(json);
    // console.log(await this.locationService.getGeoFences());
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.currentPosition) !== JSON.stringify(this.props.currentPosition)) {
      this.sendLocation(nextProps.currentPosition);
    }
  }

  processEvents = async ({ events, points }) => {
    events
      .map(event => ({
        ...event,
        points: points.filter(point => point.event === event._id).reduce((total, point) => total + point.val, 0),
      }))
      .forEach(async (event) => {
        const geofence = {
          identifier: event._id,
          latitude: event.center.lat,
          longitude: event.center.lng,
          radius: 600,
          notifyOnEntry: true,
          notifyOnExit: false,
          notifyOnDwell: false,
          extras: event,
        };

        this.locationService.addGeofence(geofence);
      });
  };

  onGeofence = (geofence) => {
    this.locationService.notify({
      title: 'Event alert',
      message: `There is an event near you. Tap for more info.\n\r${geofence.extras.label}`,
      okAction: () => this.props.navigation.navigate('EventDetail', geofence.extras),
    });
  };

  async setUpMsgChannel() {
    this.remote = await connectToRemote(this.webview);

    this.remote.on('connected', () => this.sendLocation(this.props.currentPosition));
    this.remote.on('log', data => {
      const log = Array.isArray(data) ? data : [data];
      console.log('WebView log:', ...log );
    });
    this.remote.on('navigate', json => this.props.navigation.navigate(json.page, json.data));
  }

  sendLocation(location) {
    if(this.remote) {
      this.remote.emit('location', {
        payload: {
          currentPosition: location,
        },
      });
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
      },
    });

    return (
      <View style={styles.container}>
        <WebView
          ref={webview => this.webview = webview}
          source={heatmap}
          scrollEnabled={false}
          javaScriptEnabled
          style={styles.map}
        />
      </View>
    );
  }
}

export default WatchPositionHoc(MapView);
