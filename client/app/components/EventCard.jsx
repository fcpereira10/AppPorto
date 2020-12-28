import React, { Component } from 'react';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import  EventService  from '../services/EventService';
import Moment from 'moment';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H3, H1} from 'native-base';

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
        _id: "5fe4b4d4c6dd2a9cb83b5bee",
        description:"",
        price:"",
        photo:"",
        categoryName:"",
      },
    }
  }
  async componentDidMount() {
    const { event } = this.props;
    let { title, _id, date, location, description,price, photo, categoryName } = event;
    this.setState({
      event: {
        title,
        date,
        location, 
        _id,
        description,
        price,
        photo, 
        categoryName}
      })
    
  }
  render() {
    Moment.locale('en');
    var dt = this.state.event.date;
    
    return (
          <Card> 
            <CardItem button onPress={() => this.props.navigation.navigate("Event",{
            eventId: this.state.event._id,})}>
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