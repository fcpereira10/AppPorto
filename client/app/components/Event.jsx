import React, { Component } from 'react';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation' 
import  EventService  from '../services/EventService';
class Event extends Component {
  constructor(props){
    super(props);
    this.EventService = new EventService();
    this.state = {
    event: {
        title: "",
        date: "",
        location: "",
        category: "",
        eventId: "5fe4b4d4c6dd2a9cb83b5bee"
      },
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
          
        });
        console.log(data);
      }
    });
  }

  
  static navigationOptions = {
    title: "Event",
  };
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H1,H2} from 'native-base';
  render() {
    return (
        <Content>
            <Card transparent>
              <CardItem>
                <Body>
                  <Image source={require('../assets/WalkingTour.jpg')} style={{height: 200, width: 200, flex: 1}}/>
                  <H1 style={{ fontWeight: 'bold' }}>
                    Porto Walking Tour
                  </H1>
                  <Text>
                    March 11th 2021 {"\n"}14h00
                  </Text>
                  </Body>
              </CardItem>
              <CardItem> 
                  <Text>Category:</Text>
                  <Button iconLeft transparent>
                    <Icon name='walk' />
                    <Text style= {{paddingLeft: 0}}>Tour</Text>
                  </Button>
              </CardItem>
              <CardItem> 
                  <Text>
                  Walking distance around 3km, several downhill steps {"\n"}{"\n"}
                  Wander through the cobbled streets, breath-taking viewpoints and charming squares of downtown Porto with experienced local guides
                  {"\n"}Discover our locals' favourite places, best Porto's food and learn about its rich history: a bit of history of Portugal in São Bento railway station and why are there so many churches in Porto?
                  {"\n"}{"\n"}We visit São Bento railway station, Santa Catarina, Batalha square, Santa Clara church, top of the Bridge Luis I, Cathedral (Sé), Barredo neighborhood, Ribeira quarter.
                  </Text>
              </CardItem>
              <CardItem> 
                <H2>
                  {"\n"}Price: 15€ p/person
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