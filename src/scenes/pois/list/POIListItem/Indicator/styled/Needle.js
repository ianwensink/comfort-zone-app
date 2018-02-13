import styled from 'styled-components';
import { Image } from 'react-native';

const rotateOffset = -130;
const calculateRotate = value => ((180 / 100) * value) + rotateOffset;

const formula = (diff, offset, value) => ((diff / 25) * value) + offset;

const calculateX = v => {
  if(v <= 25) return formula(3, 7, v);
  if(v <= 50) return formula(7, 3, v);
  if(v <= 75) return formula(7, 3, v);
  return formula(3, 15, v);
};

const calculateY = v => {
  if(v <= 25) return formula(-7, 14, v);
  if(v <= 50) return formula(-2, 9, v);
  if(v <= 75) return formula(2, 1, v);
  return formula(7, -14, v);
};

/**
 * x = 50 y = 17
 * x = 75 y = 24
 * y = 0,28 * x + 3
 * */

const calculateTransform = value => `rotate(${calculateRotate(value)}deg) translate(${calculateX(value)}px, ${calculateY(value)}px)`;

export default styled.Image`
  position: absolute;
  
  transform: rotate(-130deg) translate(7px, 14px); /* 0 */
  transform: rotate(-85deg) translate(10px, 7px); /* 25 */
  transform: rotate(-40deg) translate(17px, 5px); /* 50 */
  transform: rotate(5deg) translate(24px, 7px); /* 75 */
  transform: rotate(50deg) translate(27px, 14px); /* 100 */
  transform: ${p => calculateTransform(p.value)};
`;
