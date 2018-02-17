import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Image, FlatList } from 'react-native';
import moment from 'moment';

// Consts and Libs
import { AppStyles } from '../../../../theme/index';
import CustomText from '../../../../components/ui/Text';

// Components
// import { Text } from '@ui/';
import Indicator from '../../../pois/list/POIListItem/Indicator';

/* Component ==================================================================== */
const EventDetail = ({ event, navigation }) => (
  <View>
    <View style={{ padding: 16 }}>
      <CustomText h1>
        {event.label}
        {'   '}
        <Indicator events={[ event ]} scale={1} />
      </CustomText>
      <CustomText> </CustomText>

      <CustomText> </CustomText>
      <CustomText>{moment(event.timestamp).format('h:mmA - dddd, MMMM Do YYYY')}</CustomText>
      <CustomText> </CustomText>
      {event.locations.length > 0 && (
        <Fragment>
          <CustomText>Affected Point of Interests:</CustomText>
          <FlatList
            data={event.locations.map(location => ({ key: location.label }))}
            renderItem={({ item }) => <CustomText>  {'\u2022'} {item.key}</CustomText>}
          />
        </Fragment>
      )}
    </View>
    <CustomText> </CustomText>
    <CustomText> </CustomText>
    <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${event.center.lat},${event.center.lng}&zoom=16&size=600x300&maptype=roadmap&markers=color:red%7Cl%7C${event.center.lat},${event.center.lng}&key=AIzaSyD6_uRVBiAHh8DXbTZR5LETBbVQy_TSTfk`}} style={{ width: '100%', height: 200 }} />
  </View>
);

EventDetail.propTypes = { event: PropTypes.shape() };
EventDetail.componentName = 'EventDetail';

/* Export Component ==================================================================== */
export default EventDetail;
