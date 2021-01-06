import React, {Component} from 'react'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons';
import EventService from '../services/EventService'
import {
  Content,
  Card,
  CardItem,
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
        location: '',
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
          <Card transparent style={gray? { opacity: 0.7}:''}>
            <CardItem>
              <Body>
              
              <Image
                  source={require('../assets/WalkingTour.jpg')}
                  style={{height: 200, width: 200, flex: 1}}
                />
               
                <H1 style={{fontWeight: 'bold'}}>{this.state.event.title}</H1>
                <Text>{Moment(dt).format('dd MM yyyy HH:mm')}</Text>
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
})
export default withNavigation(Event)
