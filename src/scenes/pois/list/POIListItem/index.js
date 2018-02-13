import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

// Consts and Libs
import Indicator from './Indicator';

const formatSubtitle = event => moment(event.timestamp).fromNow();

/* Component ==================================================================== */
const POIListItem = ({ poi, navigation }) => (
  <ListItem
    onPress={() => navigation.navigate('POIDetail', poi)}
    title={poi.label}
    badge={{ element: <Indicator poi={poi} /> }}
  />
);

POIListItem.propTypes = { poi: PropTypes.shape({}) };
POIListItem.componentName = 'POIListItem';

/* Export Component ==================================================================== */
export default POIListItem;
