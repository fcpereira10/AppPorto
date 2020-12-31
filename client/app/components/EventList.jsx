import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import EventCard from "../components/EventCard";
import CategoryDropdown from "./CategoryDropdown";
import HeaderBar from './HeaderBar';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker} from 'native-base';
class EventList extends Component {

  static navigationOptions = {
    title: "EventListHeader",
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
    onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
        <Container>
          <Content>
            <HeaderBar/>
        
       <Card transparent style={styles.card}>
       <Item style={styles.search}>
            <Input placeholder="Search Events" />
            </Item>
        <CategoryDropdown/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            </Card>
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
  card: {
    width: '95%',
    alignSelf: 'center'
  }
})
export default withNavigation(EventList);