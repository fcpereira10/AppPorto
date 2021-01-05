import UserBookings from '../components/UserBookings'
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
        <Content>
          <UserBookings />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(UserBookingsScreen);