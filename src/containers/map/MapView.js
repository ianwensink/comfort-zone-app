import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview-messaging/WebView';
import heatmap from '../../../ios/assets/heatmap/build/index.html';

class MapView extends Component {
  static componentName = 'MapView';

  state = {
    currentPosition: {
      lat: 0,
      lng: 0,
    }
  }

  componentDidMount() {
    this.watchPosition();
    this.setUpMsgChannel();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    clearTimeout(this.setUpTimeout);
  }

  setUpMsgChannel() {
    this.webview.messagesChannel.on('json', json => {
      switch(json.action) {
        case 'connected':
          this.sendLocation();
        case 'log':
          console.log('WebView log:', json);
        case 'goTo':
        default:
          this.props.navigation.navigate(json.page, json.data);
      }
    });
  }

  watchPosition() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      if(
        position.coords.latitude !== this.state.currentPosition.lat ||
        position.coords.longitude !== this.state.currentPosition.lng
      ) {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setState({ currentPosition: newLocation }, this.sendLocation);
      }
    }, console.warn, {
      maximumAge: 10000,
      distanceFilter: 0,
    });
  }

  sendLocation() {
    // console.info('Sending location:', this.state.currentPosition);
    this.webview.sendJSON({
      payload: {
        currentPosition: this.state.currentPosition,
      },
    });
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

    const webview = <WebView
      ref={webview => this.webview = webview}
      source={heatmap}
      scrollEnabled={false}
      javaScriptEnabled
      style={styles.map}
    />;

    return (
      <View style={styles.container}>
        {webview}
      </View>
    );
  }
}

export default MapView;
