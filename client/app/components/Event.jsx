import React, { Component } from 'react';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation' 
import  EventService  from '../services/EventService';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H1,H2} from 'native-base';


import Moment from 'moment';
class Event extends Component {

  static navigationOptions = {
    title: "Event",
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
        categoryName: "",
      },
     
    }
  }
  async componentDidMount() {
     const {eventId} = this.state.event;
    await this.EventService.getEvent({eventId}, async (res) => {
      if (res.status == 200) {
        const { data } = res;
    
        this.setState({
          event: data,          
        });
        console.log("data "+res.data);
      }
    });
  }

  
  static navigationOptions = {
    title: "Event",
  };
  render() {
    Moment.locale('en');
    var dt = this.state.event.date;
    return (
        <Content>
            <Card transparent>

              <CardItem>
                <Body>
                  <Image source={require('../assets/WalkingTour.jpg')} style={{height: 200, width: 200, flex: 1}}/>
                  <H1 style={{ fontWeight: 'bold' }}>
                    {this.state.event.title}
                  </H1>
                  <Text>
                  {Moment(dt).format('dd MM yyyy HH:mm')}
                  </Text>
                  </Body>
              </CardItem>
              <CardItem> 
                  <Text>Category:</Text>
                  <Button iconLeft transparent>
                    <Icon name='walk' />
                    <Text style= {{paddingLeft: 0}}>{this.state.event.categoryName}</Text>
                  </Button>
              </CardItem>
              <CardItem> 
                  <Text>
                  {this.state.event.description}
                  </Text>
              </CardItem>
              <CardItem> 
                <H2>
                  {"\n"}Price: {this.state.event.price}
                </H2>
              </CardItem> 
              <CardItem> 
              <Button primary><Text> Book </Text></Button>
              </CardItem> 
            </Card>
        </Content>

    );
  }
}
export default withNavigation(Event);