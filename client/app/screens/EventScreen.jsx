import Event from '../components/Event'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class EventScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Content>
          <Event />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(EventScreen);