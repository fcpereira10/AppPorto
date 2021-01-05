import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Content, Text} from 'native-base';
import BookingCard from './BookingCard';
import  UserService  from '../services/UserService';

class UserBookings extends Component {

  static navigationOptions = {
    title: "UserBookings",
  };
  constructor(props) {
    super(props);
    this.UserService = new UserService();
    this.state = {
       bookings:[],
      };
  }

  async componentDidMount () {
    await this.UserService.getAllBookingsByUser({userId: "5fe1c91603adee46959f023d"}, async res => {
      if (res.status == 200) {
        const {data} = res
        console.log(data.bookings)
        this.setState({
          bookings: data.bookings
        })
      }
    })
  }
  mapBookings (booking) {
    const r = Math.floor(Math.random() * 100)
    const key = booking._id + r
    return <BookingCard event={booking} key={key} />
  }



  render() {
    const {bookings} = this.state;
    const bookingsDiv = bookings.map(this.mapBookings.bind(this))
    return (
        <Container>
            <Content style={styles.card}>
             {bookingsDiv}
            </Content>
        </Container>

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
export default withNavigation(UserBookings);