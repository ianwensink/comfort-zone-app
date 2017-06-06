import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

class MapExample extends React.Component {

  lastFetch = null;

  state = {
    mapHidden: false,
    layerHidden: false,
    addressPoints: [],
    spot: 'london_bridge',
    event: '2',
    interactive: true,
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
    fetch('http://localhost:3000/locations')
      .then(res => res.json())
      .then(pointsData => {
        const points = [];
        Object.values(pointsData).forEach(spot => Object.values(spot.events).forEach(event => event.points.forEach(point => points.push(point))));
        this.setState({ addressPoints: points })
      });
  }

  componentWillUnmount() {
    clearInterval(this.mapInterval);
  }

  onClick(e) {
    if(this.state.interactive) {
      this.processLocation(e);
    }
  }

  processLocation(e) {
    fetch('http://localhost:3000/location', {
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
        <Map center={[51.5065658, -0.0888643]} zoom={17} onclick={e => this.onClick(e)}>
          {!this.state.layerHidden &&
          <HeatmapLayer
            // fitBoundsOnLoad
            // fitBoundsOnUpdate
            points={this.state.addressPoints}
            longitudeExtractor={m => m.lng}
            latitudeExtractor={m => m.lat}
            gradient={gradient}
            intensityExtractor={m => parseFloat(m.val)}
          />
          }
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }

}

render(<MapExample />, document.getElementById('app'));
