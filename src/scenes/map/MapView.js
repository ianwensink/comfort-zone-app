import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView, connectToRemote } from 'react-native-webview-messaging';
import heatmap from '../../../ios/assets/heatmap/build/index.html';

import WatchPositionHoc from '../../hoc/WatchPositionHOC';

class MapView extends Component {
  static componentName = 'MapView';

  componentDidMount() {
    this.setUpMsgChannel();
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.currentPosition) !== JSON.stringify(this.props.currentPosition)) {
      this.sendLocation();
    }
  }

  async setUpMsgChannel() {
    this.remote = await connectToRemote(this.webview);

    this.remote.on('connected', () => this.sendLocation());
    this.remote.on('log', data => {
      const log = Array.isArray(data) ? data : [data];
      console.log('WebView log:', ...log );
    });
    this.remote.on('navigate', json => this.props.navigation.navigate(json.page, json.data));
  }

  sendLocation() {
    if(this.remote) {
      this.remote.emit('location', {
        payload: {
          currentPosition: this.props.currentPosition,
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

export default WatchPositionHoc(MapView);
