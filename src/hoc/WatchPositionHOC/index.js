import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (WrapperComponent) => {
  return class WatchPositionHOC extends Component {
    componentName = WrapperComponent.componentName;

    state = {
      currentPosition: {
        lat: 0,
        lng: 0,
      }
    };
    
    componentDidMount() {
      this.watchPosition();
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchId);
    }

    watchPosition() {
      this.watchId = navigator.geolocation.watchPosition((position) => {
        if(
          position.coords.latitude !== this.state.currentPosition.lat ||
          position.coords.longitude !== this.state.currentPosition.lng
        ) {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setState({ currentPosition: newLocation });
        }
      }, console.warn, {
        maximumAge: 10000,
        distanceFilter: 0,
      });
    }

    render() {
      return (
        <WrapperComponent
          {...this.props}
          currentPosition={this.state.currentPosition}
        />
      );
    }
  };
}
