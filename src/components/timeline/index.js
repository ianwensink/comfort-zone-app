import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
// Consts and Libs
import TimelineItem from './TimelineItem';
import { List, SearchBar } from 'react-native-elements';

/* Component ==================================================================== */
const Timeline = ({ events, navigation, onSearch }) => {
  return (
    <ScrollView>
      <SearchBar
        onChangeText={onSearch}
        lightTheme
        placeholder='Search...'
        autoCapatilize={false}
        autoCorrect={false}
        clearIcon={true}
        textInputRef='search'
      />
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
