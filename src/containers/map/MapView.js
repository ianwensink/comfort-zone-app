import React, { Component } from 'react';
import { render } from 'react-dom';
import { Platform, StyleSheet, View, WebView } from 'react-native';
import heatmap from '../../../ios/assets/heatmap/heatmap.html';

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

    let webview = null;

    // if (this.state.processedPoints) {
      const uri = Platform.OS === 'ios' ? 'heatmap/heatmap.html' : 'file:///android_asset/heatmap/heatmap.html';
      console.log('uri', uri);
      // const maxValue = Math.max(...this.state.processedPoints.map((p) => p.value));
      const script = heatmapInputGenerator();
      webview = <WebView
        source={ heatmap }
        // scrollEnabled={false}
        injectedJavaScript={script}
        javaScriptEnabled
        style={styles.map}
      />;
    // }

    return (
      <View style={styles.container}>
        { webview }
      </View>
    );
  }
}

const heatmapInputGenerator = () => {
  return `
    console.log('==============hallo=============');
  `;
};

export default MapView;
