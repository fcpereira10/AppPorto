import React, { Component } from 'react';
import { View,Button} from 'native-base';
import {StyleSheet} from 'react-native'

import {Ionicons} from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
 class EditDeleteEventButton extends Component {
  static navigationOptions = {
    title: "EditDeleteEventButton",
  };

  constructor(props) {
    super(props);
    this.state={eventId: ''}
  }

  async componentDidMount() {
    const { event } = this.props;
    let {  eventId} = event;
    this.setState({
      
        eventId,
        
      })
    
  }
  render() {
    return (
        
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{flex:1}}>
              <View style={styles.edit}>
                <Button transparent onPress={() => this.props.navigation.navigate("Edit Event",{
            eventId: this.state.eventId})} style={{backgroundColor: 'transparent', alignSelf: 'center'}}>
                  <Ionicons name="pencil-outline" size={30} color='#03045e' />
                </Button>
              </View>
            </View>
            <View style={{flex:1}}>
              <View style={styles.delete}>
                <Button transparent onPress={() => this.props.navigation.navigate("Edit Event")} style={{backgroundColor: 'transparent', alignSelf: 'center'}}>
                  <Ionicons name="trash-outline" size={30} color='#03045e' />
                </Button>
              </View>
            </View>
          </View>
        
       
    );
  }
}
const styles = StyleSheet.create({
  
    edit: {
      left:50, 
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#fbfcff',
      zIndex: 2,
      shadowColor: '#03045e',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 7,
  },
  delete: {
      right:50,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#fbfcff',
      zIndex: 2,
      shadowColor: '#03045e',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 7,
  },
})

export default withNavigation(EditDeleteEventButton);