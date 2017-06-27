import React from 'react';
import fetch from 'fetch-everywhere';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import MarkerLayer from 'react-leaflet-marker-layer';
import Marker from '../marker/index';
import CurrentPosition from '../current-position';
import RNMsgChannel from 'react-native-webview-messaging';
import LocationController from '../LocationController';

const requestAnimationFrame = window.requestAnimationFrame;

class HeatMap extends React.Component {
  lastFetch = null;
  mounted = false;

  state = {
    points: [],
    events: [],
    spot: 'london_bridge',
    event: '2',
    interactive: false,
    followCurrentPosition: true,
    currentPosition: {
      lat: 51.5035658,
      lng: -0.0888642,
    },
    latestPosition: {
      lat: 51.5035658,
      lng: -0.0888642,
    },
    latestZoom: 15,
  };

  componentDidMount() {
    this.mounted = true;
    requestAnimationFrame(() => this.interval());
    this.fetchPoints();
    this.setUpMsgChannel();
  }

  setUpMsgChannel() {
    if(RNMsgChannel) {
      try {
        window.postMessage(JSON.stringify({
          type: 'json',
          payload: { action: 'connected' },
        }));
        RNMsgChannel.on('json', json => {
          if(json.payload.currentPosition) {
            const newState = {
              currentPosition: json.payload.currentPosition,
            }
            if(this.state.followCurrentPosition) {
              newState.latestPosition = json.payload.currentPosition;
            }
            this.setState(newState);
          }
        });
      } catch(e) {
        setTimeout(() => this.setUpMsgChannel(), 1000);
      }
    } else {
      setTimeout(() => this.setUpMsgChannel(), 1000);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  interval() {
    if(!this.mounted) {
      return;
    }

    const now = Date.now();
    if(!this.lastFetch) {
      this.lastFetch = now;
    }
    if(this.lastFetch + 60000 < now) { // Fetch every minute
      this.lastFetch = now;
      this.fetchPoints();
    }
    requestAnimationFrame(() => this.interval());
  }

  fetchPoints() {
    fetch(`${process.env.SERVER_ADDR}/locations`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          points: response.points,
          events: response.events,
        });
      });
  }

  onClick(e) {
    if(this.state.interactive) {
      this.processLocation(e);
    }
  }

  processLocation(e) {
    fetch(`${process.env.SERVER_ADDR}/location`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        spot: this.state.spot,
        event: this.state.event,
        location: {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        },
      }),
    });
  }

  render() {
    const gradient = {
      0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
      0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
    };

    return (
      <div>
        <Map
          center={this.state.followCurrentPosition ? this.state.currentPosition : this.state.latestPosition}
          zoom={this.state.followCurrentPosition ? 15 : this.state.latestZoom}
          onclick={e => this.onClick(e)}
          onMovestart={() => {
            if(this.map) {
              const newPosition = this.map.leafletElement.getCenter();
              if(newPosition.lat !== this.state.latestPosition.lat || newPosition.lng !== this.state.latestPosition.lng) {
                this.setState({
                  followCurrentPosition: false,
                });
              }
            }
          }}
          onMoveend={() => this.map && this.setState({
            latestPosition: this.map.leafletElement.getCenter(),
            latestZoom: this.map.leafletElement.getZoom(),
          })}
          ref={c => this.map = c}
        >
          <MarkerLayer
          markers={this.state.events}
          latitudeExtractor={e => e.center.lat}
          longitudeExtractor={e => e.center.lng}
          markerComponent={Marker}
          />
          <MarkerLayer
          markers={[this.state.currentPosition]}
          latitudeExtractor={l => l.lat}
          longitudeExtractor={l => l.lng}
          markerComponent={CurrentPosition}
          />
          <HeatmapLayer
            fitBoundsOnLoad
            points={this.state.points}
            latitudeExtractor={p => p.lat}
            longitudeExtractor={p => p.lng}
            gradient={gradient}
            intensityExtractor={p => p.val}
          />
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
        </Map>
        <LocationController followCurrentPosition={this.state.followCurrentPosition} toggleState={() => {
          this.setState({
            followCurrentPosition: !this.state.followCurrentPosition,
            latestPosition: this.state.currentPosition,
          });
        }} />
      </div>
    );
  }
}

export default HeatMap;
