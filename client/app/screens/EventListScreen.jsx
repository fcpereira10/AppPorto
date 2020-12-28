import React from 'react';
import EventCard from "../components/EventCard";
import CategoryDropdown from "../components/CategoryDropdown"
import EventListHeader from "../components/EventListHeader";
import { Container, Content, Header, Left, Right, Body, Title, Button, Icon} from 'native-base';
import { withNavigation } from 'react-navigation'

class EventListScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
  return(
    <Container>
    <Header>
      <EventListHeader/>
    </Header>
      <Content>
      <CategoryDropdown/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
      </Content>
    </Container>
  )
}
}
export default withNavigation(EventListScreen);