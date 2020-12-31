import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Accordion, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, H1} from 'native-base';

class About extends Component {
   
    constructor(props) {
    super(props);
    this.state = {
        dataArray: [
            { title: "Intro", content: "This App was made by two Erasmus Students, Rita Norinho and Francisco Pereira, during the Programming of Mobile Devices Course of the University of Lodz under the orientation of Professor Derek O'Reilly and Professor Piotr Milczarski. The main feature of this App is the booking of activities for tourists in the city of Porto." },
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
       
        <Content style={styles.card}>
        <Accordion dataArray={this.state.dataArray}  icon="add"
            expandedIcon="remove" expanded={0}/>
        </Content>
      </Container>

    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: '95%',
    alignSelf: 'center'
  }
  
  
})
export default withNavigation(About);