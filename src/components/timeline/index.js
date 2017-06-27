import React, { PropTypes } from 'react';
import { ScrollView } from 'react-native';
// Consts and Libs
import TimelineItem from './TimelineItem';
import { List } from 'react-native-elements';

/* Component ==================================================================== */
const Timeline = ({ events, navigation }) => {
  return (
    <ScrollView>
      <List containerStyle={{ marginBottom: 20 }}>
        {events.map(event =>
          <TimelineItem
            key={event._id}
            event={event}
            navigation={navigation}
          />
        )}
      </List>
    </ScrollView>
  );
};

Timeline.propTypes = { events: PropTypes.arrayOf(PropTypes.shape({})) };
Timeline.componentName = 'Timeline';

/* Export Component ==================================================================== */
export default Timeline;
