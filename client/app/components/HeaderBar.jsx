import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon, Subtitle } from 'native-base';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
 class HeaderBar extends Component {
  render() {
    return (
    
        <Header>
          <Left style={{flex:1}}>
            <Button transparent>
            <Ionicons name="md-checkmark-circle" size={32} color="green" /> 
            </Button>
          </Left>
          <Body style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <Title>Apporto</Title>
          </Body>
          <Right style={{flex:1}}>
              <Button transparent >
            </Button>
        </Right>
        </Header>
    );
  }
}

export default withNavigation(HeaderBar);