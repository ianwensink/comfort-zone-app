import React, { PropTypes } from 'react';
import { View } from 'react-native';
// Consts and Libs
import TimelineItem from './TimelineItem';
import { List } from 'react-native-elements';

/* Component ==================================================================== */
const Timeline = ({ events, navigation }) => {
  return (
    <View>
      <List containerStyle={{ marginBottom: 20 }}>
        {events.map(event =>
          <TimelineItem
            key={event._id}
            event={event}
            navigation={navigation}
          />
        )}
      </List>
    </View>
  );
};

Timeline.propTypes = { events: PropTypes.arrayOf(PropTypes.shape({})) };
Timeline.componentName = 'Timeline';

/* Export Component ==================================================================== */
export default Timeline;
