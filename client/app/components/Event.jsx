import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation' 
import  EventService  from '../services/EventService';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H1,H2} from 'native-base';
import Spinner from "react-native-loading-spinner-overlay";
import Moment from 'moment';
class Event extends Component {

  static navigationOptions = {
    title: "Event",
  };
  constructor(props){
    super(props);
    this.EventService = new EventService();
    this.state = {
    spinner: true,
    event: {
        title: "",
        date: "",
        location: "",
        eventId: "",
        description:"",
        price:"",
        categoryName: "",
      },
     
    }
  }
  async componentDidMount() {
    const { params } = this.props.navigation.state;
    const eventId = params ? params.eventId : null;
    console.log("ID"+eventId);
    await this.EventService.getEvent({eventId}, async (res) => {
      if (res.status == 200) {
        const { data } = res;
    
        this.setState({
          
          spinner: false,
          event: data,          
        });
        console.log("DATA "+res.data);
      }
    });
  }

  
  static navigationOptions = {
    title: "Event",
  };
  render() {
    Moment.locale('en');
    var dt = this.state.event.date;
    const {spinner} = this.state;
    return (
        <Content>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && 
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
        }
        </Content>

    );
  }
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
 
})
export default withNavigation(Event);