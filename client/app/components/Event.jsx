import React, { Component } from 'react';
import { Image } from 'react-native';
import {  Content, Card, CardItem, Text, Button, Icon, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation' 
class Event extends Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    title: "Event",
  };
  render() {
    return (
        <Content>
            <Card transparent>
            <CardItem>
              <Body>
                <Image source={require('../assets/WalkingTour.jpg')} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
            </Card>
        </Content>

    );
  }
}
export default withNavigation(Event);