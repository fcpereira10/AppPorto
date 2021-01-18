import React, {Component} from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import DropdownAlert from "react-native-dropdownalert";
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
  Picker,
  Textarea,
  Body,
  Container,
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import AddImage from './illustrations/AddImage'
import HeaderBar from './HeaderBar'
class NewEvent extends Component {
  static navigationOptions = {
    title: 'NewEvent',
  }

  constructor (props) {
    super(props)
    this.CategoryService = new CategoryService()
    this.EventService = new EventService()
    
    let dt = new Date()
    this.state = {
      title: '',
      address: '',
      description: '',
      categories: [],
      selectedCategory: '',
      selectedCategoryId: '',
      image: '',
      hasImage: false,
      date: dt.getDate()+"/"+dt.getMonth()+1+"/"+dt.getFullYear(),
      price: '0',
      hour: '00:00',
      imageBase64:'', 
      spinner: true,
    }
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
    await this.CategoryService.getAllCategories({}, async res => {
      console.log('get categories')
      if (res.status == 200) {
        const {data} = res
        let arr = []
        data.categories.map(category => {
          arr.push({id: category._id, name: category.description})
        })

        this.setState({
          categories: arr,
          spinner: false, 
          
        })
      }
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })
    this.getPermissionAsync()
  }

  async pickImage () {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, 
      base64: true,
    }).then(result => {
      console.log("file size "+JSON.stringify(result))

    if (!result.cancelled) {
      this.setState({
        imageBase64: result.base64,
        image: result.uri, 
        hasImage: true,
      })
      } else {
        console.log("cancelled "+result.cancelled)
      }
    }).catch(error => console.log("error "))
    

    }


  mapCategories (category) {
    const r = Math.floor(Math.random() * 100)
    const key = category._id + r
    return <Picker.Item label={category.name} value={category.name} key={key} />
  }
  onValueChange (value) {
    let selId
    for (let cat in this.state.categories) {
      if (this.state.categories[cat].name === value) {
        selId = this.state.categories[cat].id
      }
    }
    this.setState({
      selectedCategory: value,
      selectedCategoryId: selId,
    })
    console.log('selected category ' + value)
  }
  onSubmit (event) {
    event.preventDefault()
    this.setState({spinner: true})

    if (this.state.title == '' || this.state.address == '' || this.state.image == '' ){
    this.dropDownAlertRef.alertWithType("error", "Error",
    "Title, Address and Image cannot be empty!"
    ) 
  
    }
    else {
    this.EventService.add(this.state, async res => {
      if (res.status === 200) {
        console.log('add event')
       
        this.props.navigation.navigate("Events")
      } else {
        
        this.dropDownAlertRef.alertWithType(
          "error",
          "Error",
          res.response.data.message
        );
      }
    })
  }
  this.setState({spinner: false})
  }

  render () {
    const {categories, hasImage, spinner} = this.state
    const categoriesDiv = categories.map(this.mapCategories.bind(this))
    return (
      <Container>
        <Content>
          <HeaderBar />
          <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner &&
          <View style={styles.outerCard}>
            <View style={styles.shadow}>
              <Card transparent>
                <CardItem>
                  <Body>
                    <TouchableOpacity
                      style={styles.imgShadow}
                      onPress={() => this.pickImage()}>
                      {!hasImage && (
                        <AddImage/>
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
                      value={this.state.title}
                      onChangeText={text => this.setState({ title: text })}
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
                          <Input placeholder='Address' 
                             value={this.state.address}
                             onChangeText={text => this.setState({ address: text })}
                          />
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
                  <Button onPress={event => this.onSubmit(event)}>
                    <Text> Create Event </Text>
                  </Button>
                </CardItem>
              </Card>
            </View>
          </View>
        }
        </Content>
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
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
export default withNavigation(NewEvent)
