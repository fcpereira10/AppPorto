import React, {Component} from 'react'
import {StyleSheet, Image} from 'react-native'
import {withNavigation} from 'react-navigation'
import {
  Container,
  Content,
  Card,
  CardItem,
  Item,
  Text,
  H1,
  View,
  Button,
  Icon,
  Body,
  Form,
  Picker,
} from 'native-base'
import EventService from '../services/EventService'
import Spinner from 'react-native-loading-spinner-overlay'
import Moment from 'moment'
import HeaderBar from './HeaderBar'
import { Ionicons } from '@expo/vector-icons'
class Checkout extends Component {
  static navigationOptions = {
    title: 'Checkout',
  }
  constructor (props) {
    super(props)
    this.EventService = new EventService()
    this.state = {
      selected: '1',
      spinner: true,
      event: {
        title: '',
        date: '',
        location: '',
        _id: '',
        description: '',
        price: '',
        categoryName: '',
      },
      total:"",
    }
  }
  async componentDidMount () {
    const {params} = this.props.navigation.state
    const eventId = params ? params.eventId : null
    await this.EventService.getEvent({eventId}, async res => {
      
      if (res.status == 200) {
        const {data} = res
      
        this.setState({
          spinner: false,
          event: data,
          total: (parseFloat(this.state.selected)* parseFloat(data.price)).toFixed(2),
        })
      }
    })
  }
  onValueChange (value) {
    const {price} = this.state.event;
    this.setState({
      selected: value,
      total: value *price,
    })
  }

  render () {
    const {spinner, event, total} = this.state;
    Moment.locale('en')
    var dt = this.state.event.date
    return (
      <Container>
       <Content>
       <HeaderBar/>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && (
          
         
          <View style={{paddingBottom:100}}>
        
         <View style={styles.outerCard}>
         <View style={styles.shadow }>
            <Card transparent>
              <CardItem header>
                <Text>Event Selected</Text>
              </CardItem>
              <CardItem footer>
                <Body>
                <View style={styles.imgShadow}>
                   <Image
                    source={{uri: "http://192.168.1.113:4000/uploads/"+this.state.event._id+".png"}}
                    style={styles.img}
                  /> 
                  </View>
                  <H1 style={styles.title}>{event.title}</H1>
                  <View style={{flexDirection:"row", paddingTop: 20, paddingLeft:5}}> 
                  <View>
                    <View style={{flexDirection:"row",flex:1}}>
                      <View style={styles.date}>
                        <Ionicons name='calendar-outline' size={30} style={{color: '#0077b6'}}/>
                      </View>
                      <View style={{paddingLeft:5}}>
                      <Text style={{fontSize:14,color:'#0077b6'}}>Date</Text>
                        <Text style={{fontSize:16,fontWeight:'500'}} >{Moment(dt).format('DD MMM. ')}</Text>
                        
                      </View>
                  </View>
                  </View>
                  <View style={{paddingLeft:10}}>
                    <View style={{flexDirection:"row",flex:1}}>
                      <View style={styles.date}>
                      <Ionicons name='time-outline' size={30} style={{color: '#0077b6'}}/>
                      </View>
                      <View style={{paddingLeft:5}}>
                      <Text style={{fontSize:14,color:'#0077b6'}}>Time</Text>
                      <Text style={{fontSize:16,fontWeight:'500'}} >{Moment(dt).format('HH:mm ')}</Text>
                      
                      </View>
                  </View>
                  </View>
                  <View style={{paddingLeft:10}}>
                    <View style={{flexDirection:"row",flex:1}}>
                      <View style={styles.date}>
                        <Ionicons name='pricetag-outline' size={30} style={{color: '#0077b6'}}/>
                      </View>
                      <View style={{paddingLeft:5}}>
                      <Text style={{fontSize:14,color:'#0077b6'}}>Price</Text>
                        <Text style={{fontSize:16,fontWeight:'500'}} >€{this.state.event.price}</Text>
                        
                      </View>
                  </View>
                  </View>
                    
                   </View>
                </Body>
              </CardItem>
          </Card>
          </View>
          </View>
            
          <View style={styles.outerCard}>
         <View style={styles.shadow }>
              <Card transparent>
             
              <CardItem header>
                <Text>Participants</Text>
              </CardItem>
        
        

              <CardItem >
                <Body>
                  <Item picker style={{paddingLeft:5, borderColor: 'transparent'}}>
                  <Ionicons
                            name={this.state.selected==1 ? 'person-outline' : 'people-outline'}
                            size={16}
                            style={{color: '#0077b6'}}
                          />
                    <Picker
                      mode='dropdown'
                      iosHeader='Number of Participants'
                      placeholderStyle={{color: '#98b8c3'}}
                      style={{width: undefined}}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}>
                      <Picker.Item label='1 Participant' value='1' />
                      <Picker.Item label='2 Participants' value='2' />
                      <Picker.Item label='3 Participants' value='3' />
                      <Picker.Item label='4 Participants' value='4' />
                      <Picker.Item label='5 Participants' value='5' />
                    </Picker>
                  </Item>
                  </Body>
              </CardItem>
              </Card>
       
       </View>
       </View>

       <View style={styles.outerCard}>
         <View style={styles.shadow }>

              <Card transparent>
              <CardItem header>
                <Text>Total Payment</Text>
              </CardItem>
              <CardItem>
              <Body>
              <View style={{flexDirection:"row",flex:1}}>
                      <View style={styles.cart}>
                        <Ionicons name='cart-outline' size={30} style={{color: '#0077b6'}}/>
                      </View>
                      <View style={{paddingLeft:10, paddingTop:5}}>
                        <Text note>{this.state.selected}x Ticket{this.state.selected==1 ? '' : 's'} </Text>
                        <H1>€{total}</H1>                        
                      </View>
                  </View>
                  
               
                </Body>
              </CardItem>
              <CardItem footer>
                <Body>

                  <Button primary>
                    <Text>Paypal</Text>
                  </Button>
                </Body>
              </CardItem>
              </Card>

              </View>
              </View>

            
              </View>
          
            
        )}
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#0077b6',
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 8
    
},
date: {

  alignItems: 'center',
  justifyContent: 'space-evenly',
  
  width: 35,
  height: 35,
  borderRadius: 8,
  backgroundColor: '#fbfcff',
  zIndex: 2,
  shadowColor: '#03045e',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 7,
},
cart: {

  alignItems: 'center',
  justifyContent: 'space-evenly',
  
  width: 55,
  height: 55,
  borderRadius: 8,
  backgroundColor: '#fbfcff',
  zIndex: 2,
  shadowColor: '#03045e',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 7,
},
imgShadow: {
  width: '100%',
    height: 200,
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
    fontWeight: 'bold',
  },
  price: {
    alignSelf: 'flex-end',
  },
  outerCard: {
    paddingBottom:10,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
  
  },
  shadow:{
      
    paddingBottom:10,
      width: '95%',

      borderRadius: 8,
      backgroundColor: '#fbfcff',
      zIndex: 1,
      shadowColor: '#03045e',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
  },
})
export default withNavigation(Checkout)
