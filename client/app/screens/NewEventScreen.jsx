import NewEvent from '../components/NewEvent'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class NewEventScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
          <NewEvent />
      </Container>
    )
  }
}

export default withNavigation(NewEventScreen);