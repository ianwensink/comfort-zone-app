import React from 'react';
import fetch from 'fetch-everywhere';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import MarkerLayer from 'react-leaflet-marker-layer';
import Marker from '../marker/index';

MarkerLayer.prototype.createLeafletElement = () => {};

const requestAnimationFrame = window.requestAnimationFrame;

class HeatMap extends React.Component {
  lastFetch = null;

  state = {
    points: [],
    spot: 'london_bridge',
    event: '2',
    interactive: false,
    markers: [{location: {"lat": 51.5065658, "lng": -0.0888643}}],
  };

  componentDidMount() {
    requestAnimationFrame(() => this.interval());
  }

  interval() {
    const now = new Date().getTime();
    if(!this.lastFetch) {
      this.lastFetch = now;
    }
    if(this.lastFetch + 1000 < now) {
      this.lastFetch = now;
      this.fetchPoints();
    }
    requestAnimationFrame(() => this.interval());
  }

  fetchPoints() {
    fetch(`${process.env.SERVER_ADDR}/locations`)
      .then(res => res.json())
      .then(pointsData => {
        const points = [];
        Object.values(pointsData).forEach(spot => Object.values(spot.events).forEach(event => event.points.forEach(point => points.push(point))));
        this.setState({ points });
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
        <Map center={[51.5065658, -0.0888642]} zoom={15} onclick={e => this.onClick(e)}>
          <MarkerLayer
            markers={this.state.markers}
            longitudeExtractor={m => m.location.lng}
            latitudeExtractor={m => m.location.lat}
            markerComponent={Marker} />
          <HeatmapLayer
            fitBoundsOnLoad
            points={this.state.points}
            longitudeExtractor={m => m.lng}
            latitudeExtractor={m => m.lat}
            gradient={gradient}
            intensityExtractor={m => m.val}
          />
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

export default HeatMap;
