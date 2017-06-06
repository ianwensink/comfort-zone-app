/**
 * Launch Screen
 *  - Shows a nice loading screen whilst:
 *  - Checking if user is logged in, and redirects from there
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
// Consts and Libs
import { AppSizes, AppStyles } from '@theme/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  launchImage: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
});

/* Component ==================================================================== */
class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  componentDidMount() {
    // Show status bar on app launch
    StatusBar.setHidden(false, true);
  }

  render = () => (
    <View style={[AppStyles.container]}>
      <Text>Hallo</Text>
    </View>
  );
}

/* Export Component ==================================================================== */
export default AppLaunch;
