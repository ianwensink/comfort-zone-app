import React, { Component } from 'react';
import Color from 'color';
import { colors } from '../theme';

class CurrentPositionMarker extends Component {
  state = {};
  ref = null;

  render() {
    const primaryColor = Color(colors.brand.primary);
    const customStyle = {
      markerBackground: {
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        backgroundColor: primaryColor.lighten(0.4).fade(0.5),
        marginTop: '-30px',
        marginLeft: '-30px',
      },
      icon: {
        width: '20px',
        height: '20px',
        backgroundColor: primaryColor.hex(),
        border: '3px solid #fff',
        borderRadius: '50%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <span ref={c => this.ref = c} style={Object.assign({}, this.props.style)}>
        <div style={customStyle.markerBackground}>
          <div style={customStyle.icon} />
        </div>
      </span>
    );
  }
}

export default CurrentPositionMarker;
