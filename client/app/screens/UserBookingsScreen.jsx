import UserBookings from '../components/UserBookings'
import HeaderBar from '../components/HeaderBar'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class UserBookingsScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
      <HeaderBar />
        <Content>
          <UserBookings />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(UserBookingsScreen);