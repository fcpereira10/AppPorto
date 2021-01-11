import React, { Component } from 'react';
import { View,Button} from 'native-base';
import {StyleSheet} from 'react-native'

import {Ionicons} from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
 class AddEventButton extends Component {
  static navigationOptions = {
    title: "AddEventButton",
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={styles.add}>
   
           <Button onPress={() => this.props.navigation.navigate("New Event")} style={{backgroundColor: 'transparent', alignSelf: 'center'}}>
   <Ionicons name="add-outline" size={30} color='#03045e' />
   </Button>
           
      
        </View>
       
    );
  }
}
const styles = StyleSheet.create({
  
    add: {
        
    alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: '#fbfcff',
      zIndex: 0,
      shadowColor: '#03045e',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 7,
  },
})

export default withNavigation(AddEventButton);