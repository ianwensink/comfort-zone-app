import React from 'react';
import { Image } from 'react-native';

import Needle from './styled/Needle';
import Wrapper from './styled/wrapper';

import { determineThreatLevel } from '../../../../../lib/indicator';

const width = 50;

const IndicatorComponent = ({ events, scale }) => {
  const threatLevel = determineThreatLevel(events);
  return (
    <Wrapper scale={scale} style={{ position: 'relative', width, height: width / 2 }}>
      <Image source={require('../../../../../images/gauge_without_needle.png')} style={{ width, height: width / 2 }} />
      <Needle
        source={require('../../../../../images/gauge_needle.png')}
        style={{ width: width / 3, height: width / 3 * 1.18  }}
        value={threatLevel}
      />
    </Wrapper>
  );
};

IndicatorComponent.defaultProps = {
  scale: 1,
};

export default IndicatorComponent;
