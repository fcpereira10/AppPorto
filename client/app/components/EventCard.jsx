import React, { Component } from 'react';
import { Image } from 'react-native';
import {StyleSheet} from 'react-native'
import { withNavigation } from 'react-navigation'
import  EventService  from '../services/EventService';
import Moment from 'moment';
import {Ionicons} from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem,View, Thumbnail, Text, Button, Title, Subtitle, Left, Body, StyleProvider, H3, H2, Right} from 'native-base';
class EventCard extends Component {
  static navigationOptions = {
    title: "EventCard",
  };
  constructor(props){
    super(props);
    this.EventService = new EventService();
    this.state = {
      
    event: {
        title: "",
        date: "",
        address: "",
        _id: "",
        description:"",
        price:"",
        photo:"",
        categoryName:"",
      },
    }
  }
  async componentDidMount() {
    const { event } = this.props;
    let { title, _id, date, address, description,price, photo, categoryName } = event;
    console.log(JSON.stringify(event) +" event")
    this.setState({
      event: {
        title,
        date,
        address, 
        _id,
        description,
        price,
        photo, 
        categoryName}
      })
    
  }
  render() {
    Moment.locale('en');
    var dt = this.state.event.date;
    
    return (
    

          <Card transparent> 
            <CardItem button onPress={() => this.props.navigation.navigate("Event",{
            eventId: this.state.event._id,})}>
              <Left>
              <View style={styles.date}>
                    <Text style={{fontSize:16, fontWeight:'500'}} >{Moment(dt).format('DD')}</Text>
                    <Text style={{fontSize:14}}>{Moment(dt).format('MMM.')}</Text>
              </View>
              <View style={styles.imgShadow}>
                <Image source={{uri: "http://192.168.1.100:4000/uploads/"+this.state.event.title+".png"}} style={styles.img}/> 
                </View>
              </Left>
              <Body>
              <View style={styles.info}>
                  <Text style={styles.title}>{this.state.event.title}</Text>
                  <Text style={styles.txt}><Ionicons name='location-outline' size={16} style={{color: '#0077b6'}}/> {this.state.event.address} </Text>
                  <View style={styles.icon}>
                    <Text style={styles.txt}><Ionicons name='pricetag-outline' size={16} style={{color: '#0077b6'}}/> €{this.state.event.price} </Text>

                   </View>
                </View>
                </Body>
            </CardItem>
          </Card>
    );
  }
}
const styles = StyleSheet.create({
  info: {
   padding: 10
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 8
  },
  imgShadow: {
    width: '100%',
    height: 100,
      borderRadius: 8,
      backgroundColor: '#fbfcff',
      zIndex: 1,
      shadowColor: '#03045e',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    
  },
  

  txt: {
    paddingBottom: 5,
    
    fontSize: 12,
    fontWeight: '500',
  },
  txt1: {
    color: '#0077b6',
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 10
  },

  date: {
    bottom: -5,
    left: -5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fbfcff',
    zIndex: 2,
    shadowColor: '#03045e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
},
icon: {
  
},
  


  
})
export default withNavigation(EventCard);