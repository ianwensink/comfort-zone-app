import React from 'react';
import { colors } from '../theme';

const styles = {
  wrapper: {
    position: 'fixed',
    bottom: '32px',
    right: '24px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  icon: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25px',
    height: '24px',
  },
};

const LocationController = ({ followCurrentPosition, toggleState }) => (
  <div style={styles.wrapper} onClick={toggleState}>
    <div style={styles.icon}>
      <svg fill={followCurrentPosition ? colors.brand.primary : '#414141'} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
      </svg>
    </div>
  </div>
)

export default LocationController;
