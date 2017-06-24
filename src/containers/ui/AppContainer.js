import React from 'react';
import { StatusBar, View } from 'react-native';
import { DefaultRenderer } from 'react-native-router-flux';

const AppContainer = ({ children, onNavigate }) => (
  <View style={{flex: 1}}>
    <StatusBar />
    <DefaultRenderer
      navigationState={children[1] || children[0]}
      onNavigate={onNavigate}
    />
  </View>
);

export default AppContainer;
