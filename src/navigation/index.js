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
import Map from '../scenes/map/MapView';
import EventDetail from '../scenes/timeline/event-detail';
import Timeline from '../scenes/timeline';
import POISContainer from '../scenes/pois';

// Components
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

export const MapStack = StackNavigator({
    Map: {
      screen: Map,
      navigationOptions: {
        title: 'Map',
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
    screen: MapStack,
    navigationOptions: {
      title: 'Map',
      header: null,
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => <Icon name='map' size={26} color={tintColor} />,
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
    screen: POISContainer,
    navigationOptions: {
      title: 'POI\'s',
      tabBarLabel: 'POI\'s',
      tabBarIcon: ({ tintColor }) => <Icon name='place' size={26} color={tintColor} />
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
