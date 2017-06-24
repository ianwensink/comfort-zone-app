import React, { Component } from 'react';
import { Text, View } from 'react-native';
import fetch from 'fetch-everywhere';
import { Actions } from 'react-native-router-flux';
import Loading from '../../../components/general/Loading';
import { AppStyles } from '@theme/';
import EventDetail from '../../../components/timeline/event-detail';

class EventDetailContainer extends Component {
  static componentName = 'EventDetailContainer';

  constructor(props) {
    super(props);

    this.state = {
      event: props.navigation.state.params,
    }
  }

  componentDidMount() {
    if(!this.state.event) {
      fetch(`${process.env.SERVER_ADDR}/events/${this.props.eventId}`)
        .then(res => res.json())
        .then(event => {
          this.setState({ event });
        })
        .catch();
    }
  }

  render() {
    if(!this.state.event) {
      return <Loading text='Loading event...' />;
    }

    return(
      <View style={[AppStyles.container]}>
        <EventDetail event={this.state.event} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default EventDetailContainer;
