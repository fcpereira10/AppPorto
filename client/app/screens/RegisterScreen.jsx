import Register from '../components/Register'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class RegisterScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Content>
          <Register />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(RegisterScreen);