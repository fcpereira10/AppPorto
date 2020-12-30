import Profile from '../components/Profile'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Content>
          <Profile />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(ProfileScreen);