import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

// Consts and Libs
import { AppStyles } from '../../../theme/index';

const formatSubtitle = event => moment(event.timestamp).fromNow();

/* Component ==================================================================== */
const POIListItem = ({ location, navigation }) => (
  <ListItem
    onPress={() => navigation.navigate('POIDetail', location)}
    title={location.label}
    subtitle={formatSubtitle(location)}
  />
);

POIListItem.propTypes = { location: PropTypes.shape({}) };
POIListItem.componentName = 'POIListItem';

/* Export Component ==================================================================== */
export default POIListItem;
