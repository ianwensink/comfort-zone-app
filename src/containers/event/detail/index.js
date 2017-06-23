import React, { Component } from 'react';
import { Text, View } from 'react-native';
import fetch from 'fetch-everywhere';
import { Actions } from 'react-native-router-flux';
import Loading from '@components/general/Loading';
import { AppStyles } from '@theme/';
import EventDetail from '@components/event/detail';

class EventDetailContainer extends Component {
  static componentName = 'EventDetailContainer';

  state = {
    event: {},
  }

  componentDidMount() {
    console.log(`${process.env.SERVER_ADDR}/events/${this.props.eventId}`);
    fetch(`${process.env.SERVER_ADDR}/events/${this.props.eventId}`)
      .then(res => res.json())
      .then(event => {
        this.setState({ event });
        Actions.refresh({ title: event.label });
      });
  }

  render() {
    if(!this.state.event) {
      return <Loading><Text>Loading event...</Text></Loading>;
    }

    return(
      <View style={[AppStyles.container]}>
        <EventDetail event={this.state.event} />
      </View>
    );
  }
}

export default EventDetailContainer;
