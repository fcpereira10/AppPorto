import React from 'react';
import EventCard from "../components/EventCard";
import { Container, Content, Header, Left, Right, Body, Title, Button, Icon} from 'native-base';
import { withNavigation } from 'react-navigation'
class EventListScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
  return(
    <Container>
      <Header />
      <Header>
          
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='heart' />
            </Button>
            <Button transparent>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
      <Content>
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