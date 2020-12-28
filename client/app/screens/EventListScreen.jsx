import React from 'react';
import EventList from "../components/EventList";
import { Container, Content, Header, Left, Right, Body, Title, Button, Icon, Item, Input, Text} from 'native-base';
import { withNavigation } from 'react-navigation'

class EventListScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
  return(
    <Container>
      <Content>
          <EventList/>
      </Content>
    </Container>
  )
}
}
export default withNavigation(EventListScreen);