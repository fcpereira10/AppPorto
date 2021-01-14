import EditEvent from '../components/EditEvent'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class EditEventScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
          <EditEvent />
      </Container>
    )
  }
}

export default withNavigation(EditEventScreen);