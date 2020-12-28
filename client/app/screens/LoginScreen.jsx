import Login from '../components/Login'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class LoginScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Content>
          <Login />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(LoginScreen);