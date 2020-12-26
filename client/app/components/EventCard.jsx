import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H3, H1} from 'native-base';
import { withNavigation } from 'react-navigation'
import  EventService  from '../services/EventService';
import Moment from 'moment';
class EventCard extends Component {

  static navigationOptions = {
    title: "EventCard",
  };
  constructor(props){
    super(props);
    this.EventService = new EventService();
    this.state = {
    event: {
        title: "",
        date: "",
        location: "",
        eventId: "5fe4b4d4c6dd2a9cb83b5bee",
        description:"",
        price:"",
        photo:"",
      },
      category: "",
    }
  }
  async componentDidMount() {
     const {eventId} = this.state.event;
    await this.EventService.getEvent({eventId}, async (res) => {
      if (res.status == 200) {
        const { data } = res;
        const { event } = data;
        this.setState({
          event: event,
          category: data.categoryName,
          
        });
        console.log(data);
      }
    });
  }
  render() {
    Moment.locale('en');
    var dt = this.state.event.date;
    return (
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Image source={require("../assets/WalkingTour.jpg" )} style={{height: 200, width: 200, flex: 1}}/>
                <Body>
                  <H1>{this.state.event.title}</H1>
                  <Text note>{Moment(dt).format('dd MM yyyy HH:mm')}</Text>
                  <H3>{this.state.event.price}</H3>
                </Body>
              </Left>
            </CardItem>
          </Card>
    );
  }
}

export default withNavigation(EventCard);