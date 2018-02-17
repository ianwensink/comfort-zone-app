import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

// Consts and Libs
import Indicator from './Indicator';

// Components
import NewsTicker from '../../../../components/NewsTicker';

// const getSubtitleItems = poi => poi.events.filter(event => moment(event.timestamp).isAfter(moment().add(-24, 'hour'))).map(event => event.label);
const getSubtitleItems = poi => poi.events.filter(event => moment(event.timestamp).isAfter(moment().add(-24, 'hour'))).map(event => event.label).join('');

/* Component ==================================================================== */
const POIListItem = ({ poi, navigation }) => (
  <ListItem
    onPress={() => navigation.navigate('EventDetail', poi.events[0])}
    title={poi.label}
    subtitle={getSubtitleItems(poi)}
    badge={{ element: <Indicator events={poi.events} /> }}
  />
);

POIListItem.propTypes = { poi: PropTypes.shape({}) };
POIListItem.componentName = 'POIListItem';

/* Export Component ==================================================================== */
export default POIListItem;
