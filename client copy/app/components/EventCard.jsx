import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H3, H1} from 'native-base';
//import image from './app/assets/WalkingTour.jpg'
export default class EventCard extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Image source={require('../assets/WalkingTour.jpg')} style={{height: 200, width: 200, flex: 1}}/>
                <Body>
                  <H1>Porto Tour</H1>
                  <Text note>April 15, 2016 16h00</Text>
                  <H3>15€</H3>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}