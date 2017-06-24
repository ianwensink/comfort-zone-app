import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

// Consts and Libs
import { AppStyles } from '../../../theme';

// Components
// import { Text } from '@ui/';

/* Component ==================================================================== */
const EventDetail = ({ event, navigation }) => (
  <View>
    <Text onPress={() => navigation.goBack(null)} h1>{event.label}</Text>
  </View>
);

EventDetail.propTypes = { event: PropTypes.shape() };
EventDetail.componentName = 'EventDetail';

/* Export Component ==================================================================== */
export default EventDetail;
