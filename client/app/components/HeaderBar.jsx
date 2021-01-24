import React, {Component} from 'react'
import {Header, Title, Button, Left, Right, Body} from 'native-base'
import {Ionicons} from '@expo/vector-icons'
import {withNavigation} from 'react-navigation'
class HeaderBar extends Component {
  static navigationOptions = {
    title: 'HeaderBar',
  }

  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Header transparent>
        <Left style={{flex: 1}}>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Ionicons name='arrow-back' size={25} style={{color: '#0077b6'}} />
          </Button>
        </Left>
        <Body style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Title>{this.props.navigation.state.routeName}</Title>
        </Body>
        <Right style={{flex: 1}}>
          <Button
            transparent
            onPress={() => {
              this.props.navigation.state.routeName == 'Profile'
                ? this.props.navigation.navigate('Events')
                : this.props.navigation.navigate('Profile')
            }}>
            <Ionicons
              name='menu-outline'
              size={25}
              style={{color: '#0077b6'}}
            />
          </Button>
        </Right>
      </Header>
    )
  }
}

export default withNavigation(HeaderBar)
