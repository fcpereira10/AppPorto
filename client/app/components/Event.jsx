import React, {Component} from 'react'
import {Image, StyleSheet, View, AsyncStorage} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'
import EditDeleteEventButton from './EditDeleteEventButton'
import EventService from '../services/EventService'
import UserService from '../services/UserService'
import {
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Body,
  H1,
  Container,
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import Moment from 'moment'
import HeaderBar from './HeaderBar'
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
        image: '',
      },
      gray: false,
      categoryIcon: '',
      isAdmin: false,
      isLoggedIn: false,
    }
    this.UserService = new UserService()
  }
  setCategoryIcon () {
    let icon
    switch (this.state.event.categoryName) {
      case 'Music':
        icon = 'musical-notes-outline'
        break
      case 'Sports':
        icon = 'american-football-outline'
        break
      case 'Food':
        icon = 'restauran-outline'
        break
      case 'Cultural':
        icon = 'earth-outline'
        break
      case 'Adventure':
        icon = 'happy-outline'
        break
      case 'Tour':
        icon = 'trail-sign-outline'
        break
    }
    this.setState({categoryIcon: icon})
  }

  async componentDidMount () {
    let token = ''
    try {
      token = (await AsyncStorage.getItem('token')) || ''
      console.log('token ' + token)
    } catch (error) {
      console.log('error ' + error.message)
    }
    console.log('token length ' + token.length)
    if (token.length > 0) {
      this.setState({
        isLoggedIn: true,
      })
      await this.UserService.getUser(async res => {
        if (res.status == 200) {
          const {payload} = res.data
          console.log(JSON.stringify(payload))
          this.setState({
            isAdmin: payload.isAdmin,
          })
        }
      })
    }
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
        this.setCategoryIcon()
      }
    })
  }
  checkout () {
    if (this.state.isLoggedIn)
      this.props.navigation.navigate('Checkout', {
        eventId: this.state.event._id,
      })
    else this.props.navigation.navigate('Login')
  }

  render () {
    Moment.locale('en')
    var dt = this.state.event.date
    const {spinner, gray, categoryIcon, isAdmin} = this.state

    return (
      <Container>
        <Content>
          <HeaderBar />
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />

          {!spinner && (
            <View style={styles.outerCard}>
              <View style={styles.shadow}>
                <Card transparent style={gray ? {opacity: 0.7} : ''}>
                  <CardItem>
                    <Body>
                      <View style={styles.imgShadow}>
                        <Image
                          source={{
                            uri:
                              'http://192.168.1.107:4000/uploads/' +
                              this.state.event._id +
                              '.png',
                          }}
                          style={styles.img}
                        />
                      </View>
                      {/* Title */}

                      <H1 style={{fontWeight: '700'}}>
                        {this.state.event.title}
                      </H1>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <View style={{flex: 2}}>
                          <Text style={{fontWeight: '500'}}>
                            <Ionicons
                              name='location-outline'
                              size={16}
                              style={{color: '#0077b6'}}
                            />{' '}
                            {this.state.event.address}{' '}
                          </Text>
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={{fontWeight: '500'}}>
                            <Ionicons
                              name={categoryIcon}
                              size={16}
                              style={{color: '#0077b6'}}
                            />{' '}
                            {this.state.event.categoryName}{' '}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingTop: 20,
                          paddingLeft: 5,
                        }}>
                        <View>
                          <View style={{flexDirection: 'row', flex: 1}}>
                            <View style={styles.date}>
                              <Ionicons
                                name='calendar-outline'
                                size={30}
                                style={{color: '#0077b6'}}
                              />
                            </View>
                            <View style={{paddingLeft: 5}}>
                              <Text style={{fontSize: 14, color: '#0077b6'}}>
                                Date
                              </Text>
                              <Text style={{fontSize: 16, fontWeight: '500'}}>
                                {Moment(dt).format('DD MMM. ')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{paddingLeft: 10}}>
                          <View style={{flexDirection: 'row', flex: 1}}>
                            <View style={styles.date}>
                              <Ionicons
                                name='time-outline'
                                size={30}
                                style={{color: '#0077b6'}}
                              />
                            </View>
                            <View style={{paddingLeft: 5}}>
                              <Text style={{fontSize: 14, color: '#0077b6'}}>
                                Time
                              </Text>
                              <Text style={{fontSize: 16, fontWeight: '500'}}>
                                {Moment(dt).format('HH:mm ')}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{paddingLeft: 10}}>
                          <View style={{flexDirection: 'row', flex: 1}}>
                            <View style={styles.date}>
                              <Ionicons
                                name='pricetag-outline'
                                size={30}
                                style={{color: '#0077b6'}}
                              />
                            </View>
                            <View style={{paddingLeft: 5}}>
                              <Text style={{fontSize: 14, color: '#0077b6'}}>
                                Price
                              </Text>
                              <Text style={{fontSize: 16, fontWeight: '500'}}>
                                €{this.state.event.price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Text>{this.state.event.description}</Text>
                  </CardItem>

                  <CardItem>
                    <Button
                      primary
                      disabled={gray}
                      onPress={() => this.checkout()}>
                      <Text> Book </Text>
                    </Button>
                  </CardItem>
                </Card>
                <View style={styles.editDelete}>
                  {isAdmin && (
                    <EditDeleteEventButton event={this.state.event} />
                  )}
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
  grayscale: {
    tintColor: 'gray',
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imgShadow: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#fbfcff',
    zIndex: 1,
    shadowColor: '#03045e',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  outerCard: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
  },
  shadow: {
    position: 'absolute',
    width: '95%',

    borderRadius: 8,
    backgroundColor: '#fbfcff',
    zIndex: 1,
    shadowColor: '#03045e',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 7,
  },
  editDelete: {
    zIndex: 2,
    top: 25,
  },
})
export default withNavigation(Event)
