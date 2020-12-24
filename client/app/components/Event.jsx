import React, { Component } from 'react';
import { Image } from 'react-native';
import {  Content, Card, CardItem, Text, Button, Icon, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation' 
import  EventService  from '../services/EventService';
class Event extends Component {
  constructor(props){
    super(props);
    this.EventService = new EventService();
    this.state = {
      events:[],
    }
  }
  async componentDidMount() {
    await this.EventService.getEvent(async (res) => {
      if (res.status == 200) {
        const { data } = res;
        const { event } = data;
        this.setState({
          event: event,
          
        });
        console.log(data);
      }
    });
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