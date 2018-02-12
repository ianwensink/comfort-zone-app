import React from 'react';
import PropTypes from 'prop-types';
import CustomText from "../../../../../components/ui/Text";

import { determineThreatLevel } from '../../../../../lib/indicator';

const IndicatorComponent = ({ poi }) => {
  return (
    <CustomText>{determineThreatLevel(poi.events)}</CustomText>
  );
};

IndicatorComponent.propTypes = {};

IndicatorComponent.defaultProps = {};

export default IndicatorComponent;
