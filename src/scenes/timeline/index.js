import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import moment from 'moment';
import Loading from '../../components/general/Loading';
import { AppStyles } from '../../theme';
import Timeline from './list';
import fetch from '../../lib/fetch';

class TimelineContainer extends Component {
  static componentName = 'TimelineContainer';

  state = {
    events: false,
    query: '',
  };

  async componentDidMount() {
    const { events, points } = await fetch(`${process.env.SERVER_ADDR}/heatmap`);
    const processedEvents = events.map(event => ({
      ...event,
      points: points.filter(point => point.event === event._id).reduce((total, point) => total + point.val, 0),
    }));
    this.setState({ events: processedEvents });
  }

  getEvents() {
    return this.sortEvents(this.filterEvents(this.state.events));
  }

  filterEvents(events) {
    return events.filter(event => event.label.toLowerCase().includes(this.state.query.toLowerCase()));
  }

  sortEvents(events) {
    return events.sort((a, b) => {
      return moment(b.timestamp).unix() - moment(a.timestamp).unix();
    });
  }

  onSearch(query) {
    this.setState({ query });
  }

  render() {
    if(!this.state.events) {
      return <Loading text='Loading events...' />;
    }

    return (
      <View style={[AppStyles.container]}>
        <StatusBar />
        <Timeline
          events={this.getEvents()}
          navigation={this.props.navigation}
          onSearch={(e) => this.onSearch(e)}
        />
      </View>
    );
  }
}

export default TimelineContainer;
