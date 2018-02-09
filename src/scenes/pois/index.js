import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import fetch from 'fetch-everywhere';
import Loading from '../../components/general/Loading';
import { AppStyles } from '../../theme';
import POIList from './list';
import { getDistance } from '../../lib/distance';
import WatchPositionHOC from '../../hoc/WatchPositionHOC';

class POISContainer extends Component {
  static componentName = 'POISContainer';

  state = {
    events: [],
    points: [],
    query: '',
  };

  componentDidMount() {
    fetch(`${process.env.SERVER_ADDR}/heatmap`)
      .then(res => res.json())
      .then((json) => {
        this.setState(json);
      })
      .catch(console.error);
  }

  getLocations() {
    const events = this.state.events;
    const allLocations = events.reduce((result, event) => {
      const locations = event.locations.map(location => ({
        ...location,
        events: events.filter(e => e.locations.find(l => l._id === location._id)),
      }));
      return ([ ...result, ...locations ]);
    }, []);
    return this.sortLocations(this.filterLocations(allLocations));
  }

  filterLocations(locations) {
    return locations.filter((location, pos, filteredArr) => (filteredArr.map(mapObj => mapObj._id).indexOf(location._id) === pos) && location.label.toLowerCase().includes(this.state.query.toLowerCase()));
  }

  sortLocations(locations) {
    return locations.sort((a, b) => {
      const { lat, lng } = this.props.currentPosition;
      const distanceA = getDistance(a.location.lat, a.location.lng, lat, lng);
      const distanceB = getDistance(b.location.lat, b.location.lng, lat, lng);
      return distanceA - distanceB;
    });
  }

  onSearch(query) {
    this.setState({ query });
  }

  render() {
    if(this.state.events.length === 0) {
      return <Loading text='Loading events...' />;
    }

    return (
      <View style={[AppStyles.container]}>
        <StatusBar />
        <POIList
          locations={this.getLocations()}
          navigation={this.props.navigation}
          onSearch={(e) => this.onSearch(e)}
        />
      </View>
    );
  }
}

export default WatchPositionHOC(POISContainer);
