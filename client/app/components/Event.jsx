import React, {Component} from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons';
import EventService from '../services/EventService'
import {
  Content,
  Card,
  CardItem,
  StyleProvider,
  Text,
  Button,
  Body,
  H1,
  H2,
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import Moment from 'moment'
import HeaderBar from './HeaderBar';
class Event extends Component {
  static navigationOptions = {
    title: 'Event',
  }
  constructor (props) {
    super(props)
    this.EventService = new EventService()
    this.state = {
      spinner: true,
      event: {
        title: '',
        date: '',
        address: '',
        eventId: '',
        description: '',
        price: '',
        categoryName: '',
      },
      gray: false,
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
          gray: new Date(data.date) < new Date(Date.now()) ? true : false, 
        })
        console.log('DATA ' +this.state.gray)
      }
    })
  }

  static navigationOptions = {
    title: 'Event',
  }
  render () {
    Moment.locale('en')
    var dt = this.state.event.date
    const {spinner, gray} = this.state
    return (
      
      <Content>
       <HeaderBar/>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && (
          <Card style={gray? { opacity: 0.7}:''}>
            <CardItem>
              <Body>
              
              <Image
                  source={require('../assets/WalkingTour.jpg')}
                  style={styles.img}
                />
                <View style={{flexDirection:"row", padding: 20}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 20}}><Ionicons name='calendar-outline' size={30} style={{color: '#00b4d8'}}/> {Moment(dt).format('DD MMM. yyyy')} </Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 20}}> <Ionicons name='time-outline' size={30} style={{color: '#00b4d8'}}/> {Moment(dt).format('HH:mm')} </Text>
                    </View>
                </View>
                <H1 style={{fontWeight: 'bold'}}>{this.state.event.title}</H1>
               
              </Body>
            </CardItem>
            <CardItem>
              <Text>Category:</Text>
              <Button iconLeft transparent disabled={gray}>
                <Ionicons name='musical-notes-outline' size={18}/>
                <Text style={{paddingLeft: 0}}>
                  {this.state.event.categoryName}
                </Text>
              </Button>
            </CardItem>
            <CardItem>
              <Text>{this.state.event.description}</Text>
            </CardItem>
            <CardItem>
              <H2>
                {'\n'}Price: €{this.state.event.price}
              </H2>
            </CardItem>
            <CardItem>
              <Button primary disabled={gray} onPress={() => this.props.navigation.navigate("Checkout",{
            eventId: this.state.event._id,})}>
                <Text> Book </Text>
              </Button>
            </CardItem>
          </Card>
        )}
      </Content>
    
    )
  }
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  grayscale: {
    tintColor: 'gray',
  },
  img: {
      width: '100%',
      height: 200,
      borderRadius: 8
  },
})
export default withNavigation(Event)
