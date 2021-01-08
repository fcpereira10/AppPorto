import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body } from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
 class HeaderBar extends Component {
  static navigationOptions = {
    title: "HeaderBar",
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
    
        <Header transparent>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>

              <Ionicons name='arrow-back' size={20} style={{color: '#00b4d8'}} />

            </Button>
          </Left>
          <Body style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <Title>{this.props.navigation.state.routeName}</Title>
          </Body>
          <Right style={{flex:1}}>
              <Button transparent >

            <Ionicons name='person' size={20} style={{color: '#00b4d8'}}/>

            </Button>
        </Right>
        </Header>
    );
  }
}

export default withNavigation(HeaderBar);