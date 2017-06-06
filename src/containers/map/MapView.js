import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import heatmap from '../../../ios/assets/heatmap/build/index.html';

class MapView extends Component {
  static componentName = 'MapView';

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
      source={heatmap}
      scrollEnabled={false}
      javaScriptEnabled
      style={styles.map}
    />;

    return (
      <View style={styles.container}>
        { webview }
      </View>
    );
  }
}

export default MapView;
