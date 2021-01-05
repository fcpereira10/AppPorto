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
       events:[],
      };
  }

  async componentDidMount () {
    await this.UserService.getAllBookingsByUser({userId: "5fe1c91603adee46959f023d"}, async res => {
      if (res.status == 200) {
        const {data} = res

        this.setState({
          events: data.events,
        })
      }
    })
  }
  mapBookings (event) {
    const r = Math.floor(Math.random() * 100)
    const key = event._id + r
    return <BookingCard event={event} key={key} />
  }



  render() {
    const {events} = this.state;
    const bookingsDiv = events.map(this.mapBookings.bind(this))
    return (
        <Container>
            <Content style={styles.card}>
              <Text>December 2020</Text>
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