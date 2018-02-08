import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
// Consts and Libs
import POIListItem from './POIListItem';
import { List, SearchBar } from 'react-native-elements';

/* Component ==================================================================== */
const POIList = ({ locations, navigation, onSearch }) => {
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
        {locations.map(location =>
          <POIListItem
            key={location._id}
            location={location}
            navigation={navigation}
          />
        )}
      </List>
    </ScrollView>
  );
};

POIList.propTypes = { locations: PropTypes.arrayOf(PropTypes.shape({})) };
POIList.componentName = 'POIList';

/* Export Component ==================================================================== */
export default POIList;
