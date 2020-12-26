import React, { Component } from 'react';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H3, H1} from 'native-base';
import EventScreen from '../screens/EventScreen';
class EventCard extends Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: "EventCard",
  };
  render() {
    return (
          <Card style={{flex: 0}}>
            <CardItem button onPress={() => this.props.navigation.navigate("Event")}>
              <Left>
                <Image source={require('../assets/WalkingTour.jpg')} style={{height: 200, width: 200, flex: 1}}/>
                <Body>
                  <H1>Porto Tour</H1>
                  <Text note>March 11th 2021 16h00</Text>
                  <H3>15€</H3>
                </Body>
              </Left>
            </CardItem>
          </Card>
    );
  }
}

export default withNavigation(EventCard);