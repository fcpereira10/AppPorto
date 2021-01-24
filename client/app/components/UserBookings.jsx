import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Content, Text} from 'native-base';
import BookingCard from './BookingCard';
import  UserService  from '../services/UserService';
import Spinner from 'react-native-loading-spinner-overlay'

class UserBookings extends Component {

  static navigationOptions = {
    title: "UserBookings",
  };
  constructor(props) {
    super(props);
    this.UserService = new UserService();
    this.state = {
       bookings:[],
       spinner: true,
      };
  }

  async componentDidMount () {
    
    await this.UserService.getAllBookingsByUser({}, async res => {
      if (res.status == 200) {
        const {data} = res
        this.setState({
          bookings: data.bookings,
          spinner: false,
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
    const {bookings, spinner} = this.state;
    const bookingsDiv = bookings.map(this.mapBookings.bind(this))
    return (
        <Container>
            <Content style={styles.card}>
            <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          {!spinner && (
             bookingsDiv
          )}
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