import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon, Subtitle } from 'native-base';
import { withNavigation } from 'react-navigation';

 class HeaderBar extends Component {
  render() {
    return (
    
        <Header>
          <Left style={{flex:1}}>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style = {{flexDirection: 'row', justifyContent: 'center'}}>
            <Title>Apporto</Title>
          </Body>
          <Right style={{flex:1}}>
              <Button transparent >
            <Icon name='person'/>
            </Button>
        </Right>
        </Header>
    );
  }
}

export default withNavigation(HeaderBar);