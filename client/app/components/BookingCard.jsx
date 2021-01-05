import React, { Component } from 'react';
import { Image,StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import  EventService  from '../services/EventService';
import Moment from 'moment';
import { Card, CardItem,  Text, Body, H1} from 'native-base';

class BookingCard extends Component {
  static navigationOptions = {
    title: "BookingCard",
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
        <CardItem header>
          <Text>Booked in December 24th 2020</Text>
        </CardItem>
        <CardItem>
          <Body>
          <Image source={require('../assets/WalkingTour.jpg')} style={styles.img}/>
                  <H1 style={styles.title}>
                  Porto Walking Tour
                  </H1>
                  <Text>
                      March 11th 2021 - 14h00
                  </Text>
                  
          </Body>
        </CardItem>
        <CardItem footer>
        <Text>Price paid: 30€</Text>
      </CardItem>

      </Card>
    );
  }
}
const styles = StyleSheet.create({

    img: {
      resizeMode: "cover",
      height: 150,
      width: '100%'
      
    },
    title: {
      fontWeight: 'bold'
    },
    card: {
      width: '95%',
      alignSelf: 'center'
    },
    price: {
      alignSelf: 'flex-end',
    }
    
  })

export default withNavigation(BookingCard);