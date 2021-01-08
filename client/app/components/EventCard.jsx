import React, { Component } from 'react';
import { Image } from 'react-native';
import {StyleSheet} from 'react-native'
import { withNavigation } from 'react-navigation'
import  EventService  from '../services/EventService';
import Moment from 'moment';
import {Ionicons} from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem,View, Thumbnail, Text, Button, Title, Subtitle, Left, Body, StyleProvider, H3, H2, Right} from 'native-base';
import commonColor from '../../native-base-theme/variables/commonColor';
import getTheme from '../../native-base-theme/components'; 
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
        _id: "5fe4b4d4c6dd2a9cb83b5bee",
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
      <StyleProvider style={getTheme(commonColor)}>

          <Card transparent> 
            <CardItem button onPress={() => this.props.navigation.navigate("Event",{
            eventId: this.state.event._id,})}>
              <Left>
              <View style={styles.view2}>
                    <Text style={{fontSize:18, fontWeight:'500'}} >{Moment(dt).format('DD')}</Text>
                    <Text style={{}}>{Moment(dt).format('MMM.')}</Text>
                  </View>
                <Image source={require("../assets/WalkingTour.jpg" )} style={styles.img}/>

                
              </Left>
              <Body>
              <View style={styles.info}>
                  <Title style={styles.title}>{this.state.event.title}</Title>
                  <Text style={styles.txt}><Ionicons name='location-outline' size={16} style={{color: '#00b4d8'}}/> {this.state.event.address} </Text>
                  <Text style={styles.txt}><Ionicons name='time-outline' size={16} style={{color: '#00b4d8'}}/> {Moment(dt).format('HH:mm')} </Text>
                  <Text style={styles.price}><Ionicons name='pricetag-outline' size={16} style={{color: '#03045e'}}/> €{this.state.event.price}</Text>

                  </View>
                </Body>
         

       
            </CardItem>
          </Card>
          </StyleProvider>
    );
  }
}
const styles = StyleSheet.create({
  info: {
    padding:10,
  },
  img: {
    height: 100, width: 'auto', flex: 1, borderRadius: 8
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 10
    
  },
  price: {
    
  },
  txt: {
    color: '#00b4d8',
    fontSize: 12,
    paddingBottom: 10
  },

  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
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
export default withNavigation(EventCard);