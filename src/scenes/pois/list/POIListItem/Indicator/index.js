import React from 'react';
import { Image, View } from 'react-native';

import Needle from './styled/Needle';

import { determineThreatLevel } from '../../../../../lib/indicator';

const IndicatorComponent = ({ poi }) => {
  const threatLevel = determineThreatLevel(poi.events);
  return (
    <View style={{ position: 'relative' }}>
      <Image source={require('../../../../../images/gauge_without_needle.png')} style={{ width: 50, height: 25 }} />
      <Needle
        source={require('../../../../../images/gauge_needle.png')}
        style={{ width: 16, height: 19 }}
        value={threatLevel}
      />
    </View>
  );
};

export default IndicatorComponent;
