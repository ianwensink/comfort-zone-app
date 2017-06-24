import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { onMessage } from '../webview/index';
import heatmap from '../../../ios/assets/heatmap/build/index.html';

const MapView = ({ navigation }) => {
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
    onMessage={(e) => onMessage(e, navigation)}
  />;

  return (
    <View style={styles.container}>
      {webview}
    </View>
  );
}

MapView.componentName = 'MapView';

export default MapView;
