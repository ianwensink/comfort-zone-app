import React, { Component } from 'react';
import { Text, View,Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import fetch from '../../../lib/fetch';
import Loading from '../../../components/general/Loading';
import { AppStyles } from '@theme/';
import EventDetail from './component/index';

class EventDetailContainer extends Component {
  static componentName = 'EventDetailContainer';
  constructor(props) {
    super(props);

    this.state = {
      event: props.navigation.state.params,
    }
  }

  async componentDidMount() {
    if(!this.state.event) {
      const event = await fetch(`${process.env.SERVER_ADDR}/events/${this.props.eventId}`);
      this.setState({ event });
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
