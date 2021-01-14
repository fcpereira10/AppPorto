import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import CategoryService from '../services/CategoryService'
import EventService from '../services/EventService'
import {TextInputMask} from 'react-native-masked-text'

import {
  Content,
  Card,
  CardItem,
  Item,
  Text,
  Button,
  Input,
  Header,
  Picker,
  Textarea,
  Body,
  H1,
  H2,
  Container,
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import Moment from 'moment'
import HeaderBar from './HeaderBar'
class EditEvent extends Component {
  static navigationOptions = {
    title: 'EditEvent',
  }

  constructor (props) {
    super(props)
    this.CategoryService = new CategoryService()
    this.EventService = new EventService()
    this.state = {

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
      categories: [],
      selectedCategory: '',
      hasImage: false,
      
    }
    this.EventService = new EventService()
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === 'ios') {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
    // Camera Permission
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasPermission: status === 'granted'})
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

  async pickImage () {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,

    })
    

    if (!result.cancelled) {
      console.log('URI ' + result.uri)
      this.setState({
        image: result.uri,
        hasImage: true,
      })
      
    }
  }

  mapCategories (category) {
    const r = Math.floor(Math.random() * 100)
    const key = category._id + r
    return <Picker.Item label={category.name} value={category.name} key={key} />
  }
  onValueChange (value) {
    this.setState({
      selectedCategory: value,
    })
  }
  onSubmit(event) {
    event.preventDefault();

  }

  render () {
    const {categories, image, hasImage} = this.state
    const categoriesDiv = categories.map(this.mapCategories.bind(this))
    Moment.locale('en')
 

    return (
      <Container>
        <Content>
          <HeaderBar />

          <View style={styles.outerCard}>
            <View style={styles.shadow}>
              <Card transparent>
                <CardItem>
                  <Body>
                    <TouchableOpacity
                      style={styles.imgShadow}
                      onPress={() => this.pickImage()}>
                      {!hasImage && (
                        <Ionicons
                          name='add-outline'
                          size={70}
                          style={{color: '#98b8c3', alignSelf: 'center'}}
                        />
                      )}

                      {hasImage && (
                        <Image
                          source={{uri: this.state.image}}
                          style={styles.img}
                        />
                      )}
                    </TouchableOpacity>

                    <Input
                      placeholder='Title'
                      style={{fontSize: 15 * 1.8, fontWeight: '700'}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        top: -10,
                      }}>
                      <View style={{flex: 2}}>
                        <Item style={{borderColor: 'transparent'}}>
                          <Ionicons
                            name='location-outline'
                            size={16}
                            style={{color: '#0077b6'}}
                          />
                          <Input placeholder='Address' />
                        </Item>
                      </View>
                      <View style={{flex: 1, paddingTop: 5}}>
                        <Item picker style={{borderColor: 'transparent'}}>
                          <Ionicons
                            name='list-outline'
                            size={16}
                            style={{color: '#0077b6'}}
                          />

                          <Picker
                            mode='dropdown'
                            note={false}
                            mode='dropdown'
                            style={{width: undefined}}
                            placeholder='Category'
                            selectedValue={this.state.selectedCategory}
                            onValueChange={this.onValueChange.bind(this)}
                            placeholderIconColor='#0077b6'
                            placeholderStyle={{color: '#98b8c3'}}>
                            {categoriesDiv}
                          </Picker>
                        </Item>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 10,
                        paddingLeft: 5,
                       
                      }}>
                      <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', flex:1}}>
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
                            <View>
                              <TextInputMask
                                type={'datetime'}
                                options={{
                                  format: 'DD/MM/YYYY',
                                }}
                                value={this.state.date}
                                onChangeText={text => {
                                  this.setState({
                                    date: text,
                                  })
                                }}
                                color={'#98b8c3'}
                                
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={{paddingLeft:20,flex:1}}>
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
                            <TextInputMask
                              type={'datetime'}
                              options={{
                                format: 'HH:mm',
                              }}
                              value={this.state.hour}
                              onChangeText={text => {
                                this.setState({
                                  hour: text,
                                })
                              }}
                              color={'#98b8c3'}
                              // add the ref to a local var
                              ref={ref => (this.datetimeField = ref)}
                            />
                          </View>
                        </View>
                      </View>
         
                      <View style={{flex:1}}>
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
                          
                            <TextInputMask
                              type={'money'}
                              options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: '€',
                                suffixUnit: '',
                              }}
                              value={this.state.price}
                              onChangeText={text => {
                                this.setState({
                                  price: text,
                                })
                                
                              }}
                              color={'#98b8c3'}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </Body>
                </CardItem>
                <CardItem>
                  <Textarea rowSpan={5} bordered placeholder='Description' placeholderTextColor={'#98b8c3'}/>
                </CardItem>

                <CardItem>
                  <Button onPress={(event) => this.onSubmit(event)}>
                    <Text> Submit </Text>
                  </Button>
                </CardItem>
              </Card>
            </View>
          </View>
        </Content>
      </Container>
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
    borderRadius: 8,
  },
  imgShadow: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
    paddingBottom:100,
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
    justifyContent: 'center',

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
})
export default withNavigation(EditEvent)
