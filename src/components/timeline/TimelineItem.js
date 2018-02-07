import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

// Consts and Libs
import { AppStyles } from '../../theme';

const formatSubtitle = event => moment(event.timestamp).fromNow();

/* Component ==================================================================== */
const TimelineItem = ({ event, navigation }) => (
  <ListItem
    onPress={() => navigation.navigate('EventDetail', event)}
    title={event.label}
    subtitle={formatSubtitle(event)}
  />
);

TimelineItem.propTypes = { event: PropTypes.shape({}) };
TimelineItem.componentName = 'TimelineItem';

/* Export Component ==================================================================== */
export default TimelineItem;
