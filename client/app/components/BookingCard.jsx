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
    booking: {
        bookingDate:"",
        numberTickets:"", 
        pricePaid:"",
    },
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
    user: {
      username:"",
    }
      }
    }
  async componentDidMount() {
    const { event } = this.props;
    let { bookingDate, numberTickets, pricePaid } = event;
    let {title, date, location, _id, description, price, photo, categoryName} = event.event;
    let {username} = event.user;

    this.setState({
      booking: {
         bookingDate,
         numberTickets, 
         pricePaid,
      },
        event: {
        title,
        date,
        location, 
        _id,
        description,
        price,
        photo, 
        categoryName},
        user: {
          username,
        }
      })
    
  }
  render() {
    Moment.locale('en');
    var dt = this.state.booking.bookingDate;
    var dt1 = this.state.event.date;
  
    return (
        <Card>
        <CardItem header>
          <Text>Booked in {Moment(dt).format('DD MM yyyy HH:mm')} by {this.state.user.username}</Text>
        </CardItem>
        <CardItem button onPress={() => this.props.navigation.navigate("Event",{
            eventId: this.state.event._id,})}>
          <Body>
          <Image source={require('../assets/WalkingTour.jpg')} style={styles.img}/>
                  <H1 style={styles.title}>
                  {this.state.event.title}
                  </H1>
                  <Text>
                  {Moment(dt1).format('DD MM yyyy HH:mm')}
                  </Text>
                  
          </Body>
        </CardItem>
        <CardItem footer>
        <Text>Price paid: {this.state.booking.pricePaid}</Text>
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