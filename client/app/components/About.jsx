import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Accordion, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, H1} from 'native-base';

class About extends Component {
   
    constructor(props) {
    super(props);
    this.state = {
        dataArray: [
            { title: "First Element", content: "Lorem ipsum dolor sit amet" },
            { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
            { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
          ],
          selected:"key0x"
        };
    }
  static navigationOptions = {
    title: "About",
  };
  
  render() {
    return (
        <Container>
       
        <Content padder>
        
        </Content>
      </Container>

    );
  }
}
const styles = StyleSheet.create({
  card: {
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center'
  },
  input: {
    width: '80%'
  },
  avatar: {
    marginBottom: 20,
    height: 150,
    width: 150,
    borderRadius:100,
  },
  notregistered: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  register: {
    paddingLeft: 5,
  }
  
  
})
export default withNavigation(About);