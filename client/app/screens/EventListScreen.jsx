import React from 'react';
import EventCard from "../components/EventCard";
import { Container, Content, Header} from 'native-base';

function App(){
  return(
    <Container>
      <Header />
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
export default App;