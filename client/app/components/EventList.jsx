import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import EventCard from "../components/EventCard";
import CategoryDropdown from "./CategoryDropdown";
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
        <Header transparent searchBar>
            <Item style={styles.search}>
            <Input placeholder="Search Events" />
            </Item>
        </Header>
        <CategoryDropdown/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
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