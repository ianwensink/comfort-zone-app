import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

// Consts and Libs
import { AppStyles } from '../../theme';

/* Component ==================================================================== */
const TimelineItem = ({ event, navigation }) => (
  <ListItem onPress={() => navigation.navigate('EventDetail', event)}>
    <Text h1>{event.label}</Text>
  </ListItem>
);

TimelineItem.propTypes = { event: PropTypes.shape({}) };
TimelineItem.componentName = 'TimelineItem';

/* Export Component ==================================================================== */
export default TimelineItem;
