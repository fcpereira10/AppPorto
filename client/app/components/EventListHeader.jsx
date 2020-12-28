import React, { Component } from 'react';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation'
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
        <Header searchBar rounded>
            <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
            </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
          <Form>
            <Picker
              mode="dropdown"
              placeholder="Select a category"
              iosIcon={<Icon name="filter" />}
              textStyle={{ color: "blue" }}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)} 
            >
              <Picker.Item label="Sports" value="key0" />
              <Picker.Item label="Cultural" value="key1" />
              <Picker.Item label="Food and Drink" value="key2" />
            </Picker>
          </Form>
        </Header>
      </Container>
    );
  }
}

export default withNavigation(EventListHeader);