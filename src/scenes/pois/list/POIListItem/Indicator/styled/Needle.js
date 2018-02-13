import styled from 'styled-components';
import { Image } from 'react-native';

const rotateOffset = -130;
const calculateRotate = value => ((180 / 100) * value) + rotateOffset;

const calculateX = value => {
  if(value <= 25) return ((3 / 100) * value) + 7;
  if(value <= 50) return ((7 / 100) * value) + 10;
  if(value <= 75) return ((7 / 100) * value) + 17;
  return ((3 / 100) * value) + 24;
};

const calculateY = value => {
  if(value <= 25) return ((-7 / 100) * value) + 14;
  if(value <= 50) return ((-2 / 100) * value) + 7;
  if(value <= 75) return ((2 / 100) * value) + 5;
  return ((7 / 100) * value) + 7;
};

export const calculateTransform = value => `rotate(${calculateRotate(value)}deg) translate(${calculateX(value)}px, ${calculateY(value)}px)`;

export default styled.Image`
  position: absolute;
  
  transform: rotate(-130deg) translate(7px, 14px); /* 0 */
  transform: rotate(-85deg) translate(10px, 7px); /* 25 */
  transform: rotate(-40deg) translate(17px, 5px); /* 50 */
  transform: rotate(5deg) translate(24px, 7px); /* 75 */
  transform: rotate(50deg) translate(27px, 14px); /* 100 */
  transform: ${p => calculateTransform(p.value)};
`;
