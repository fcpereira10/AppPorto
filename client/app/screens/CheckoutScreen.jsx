import Checkout from '../components/Checkout'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class CheckoutScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Content>
          <Checkout />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(CheckoutScreen);