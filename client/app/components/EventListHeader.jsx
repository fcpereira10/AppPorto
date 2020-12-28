import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import CategoryDropdown from "../components/CategoryDropdown";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker} from 'native-base';
class EventListHeader extends Component {

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
        <Header searchBar>
            <Item>
            <Icon name="search" />
            <Input placeholder="Search Events" />
            </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: "#464646",
    paddingBottom: 15,
  },
})
export default withNavigation(EventListHeader);