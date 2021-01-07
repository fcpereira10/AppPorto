import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body } from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
 class HeaderBar extends Component {
  render() {
    return (
    
        <Header transparent>
          <Left style={{flex:1}}>
            <Button transparent>

              <Ionicons name='arrow-back' size={20}/>


            </Button>
          </Left>
          <Body style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <Title>Apporto</Title>
          </Body>
          <Right style={{flex:1}}>
              <Button transparent >

            <Ionicons name='person' size={20}/>

            </Button>
        </Right>
        </Header>
    );
  }
}

export default withNavigation(HeaderBar);