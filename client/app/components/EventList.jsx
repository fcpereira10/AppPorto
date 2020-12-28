import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import EventCard from "../components/EventCard";
import CategoryDropdown from "./CategoryDropdown";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker} from 'native-base';
import  EventService  from '../services/EventService';
class EventList extends Component {

  static navigationOptions = {
    title: "EventListHeader",
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      events: [],
    };
    this.EventService = new EventService();
  }
    onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  async componentDidMount() {
   await this.EventService.getAllEvents({}, async (res) => {
     if (res.status == 200) {
       const { data } = res;
       
       this.setState({
         events: data.events,
         
       });
     }
   });
 }
 mapEvents(event) {
  const r = Math.floor(Math.random() * 100);
  const key = event._id + r;
  return <EventCard event={event} key={key}/>;
}
 onChange = async (event) => {    
  const {eventCount, target, text} = event.nativeEvent;
  console.log("event "+text);
  await this.EventService.fetchSearchResults({query: text}, async (res) => {
        if (res.status == 200) {
          const { data } = res;
          console.log("events "+data.events);
          this.setState({events:data.events})
        }
       
  })
};
  render() {
    const {events} = this.state;
    const eventsDiv = events.map(this.mapEvents.bind(this));
    return (
        <Container>
          <Content>
        <Header transparent searchBar>
            <Item style={styles.search}>
            <Input placeholder="Search Events" onChange={this.onChange} value={this.state.first}/>
            </Item>
        </Header>
        <CategoryDropdown/>
           {eventsDiv}
          </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  search: {
    backgroundColor:"transparent", 
    borderBottomColor:"#ccc"
  },
})
export default withNavigation(EventList);