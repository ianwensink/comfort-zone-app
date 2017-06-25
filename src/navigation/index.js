/**
 * App Navigation
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
// Consts and Libs
// Scenes
import Placeholder from '../components/general/Placeholder';
import Map from '../containers/map/MapView';
import EventDetail from '../containers/timeline/event-detail';
import Timeline from '../containers/timeline';
// Components
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

export const TimelineStack = StackNavigator({
    Timeline: {
      screen: Timeline,
      navigationOptions: {
        title: 'Timeline',
      },
    },
    EventDetail: {
      screen: EventDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.label,
      }),
    },
  }
);

export const Tabs = TabNavigator({
  Map: {
    screen: Map,
    navigationOptions: {
      title: 'Map',
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => <Icon name='map' size={26} color={tintColor} />
    },
  },
  Timeline: {
    screen: TimelineStack,
    navigationOptions: {
      title: 'Timeline',
      header: null,
      tabBarLabel: 'Timeline',
      tabBarIcon: ({ tintColor }) => <Icon name='timeline' size={26} color={tintColor} />,
    },
  },
  Schedule: {
    screen: Placeholder,
    navigationOptions: {
      title: 'Schedule',
      tabBarLabel: 'Schedule',
      tabBarIcon: ({ tintColor }) => <Icon name='list' size={26} color={tintColor} />
    },
  },
  Settings: {
    screen: Placeholder,
    navigationOptions: {
      title: 'Settings',
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name='settings' size={26} color={tintColor} />
    },
  },
});

export const root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
});

export default root;
