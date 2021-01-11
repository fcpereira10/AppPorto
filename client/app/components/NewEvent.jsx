import React, {Component} from 'react'
import {Image, StyleSheet, TouchableOpacity, View, VirtualizedList} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import CategoryService from '../services/CategoryService'
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
  Body,
  H1,
  H2,
  Container,
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import Moment from 'moment'
import HeaderBar from './HeaderBar';
class NewEvent extends Component {
  static navigationOptions = {
    title: 'NewEvent',
  }
  constructor (props) {
    super(props)
    this.CategoryService = new CategoryService()
    this.state = {
      event: {
        title: '',
        date: '',
        address: '',
        eventId: '',
        description: '',
        price: '',
        categoryName: '',
      },
      categories:[],
      selectedCategory: '',
    }
  }

  getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
    }

  async componentDidMount () {
    await this.CategoryService.getAllCategories({}, async res => {
        console.log("get categories")
        if (res.status == 200) {
          const {data} = res
          let arr = [] ;
            data.categories.map(category => {arr.push({id: category._id, name: category.description})
          })
  
          this.setState({
            categories: arr ,
          })
        }
      })
      this.getPermissionAsync()
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
  mapCategories (category) {
    const r = Math.floor(Math.random() * 100)
    const key = category._id + r
    return <Picker.Item label={category.name} value={category.name}  key={key} />
  }
  onValueChange(value) {
    this.setState({
      selectedCategory: value
    });
  }
  
  render () {
      const {categories} = this.state;
    const categoriesDiv = categories.map(this.mapCategories.bind(this))
    Moment.locale('en')
    var dt = this.state.event.date
  
    return (
      <Container>
      <Content>
       <HeaderBar/>
        
         <View style={styles.outerCard}>
         <View style={styles.shadow }>
          <Card transparent >
            <CardItem>
              <Body>
              
              <View style={styles.imgShadow}>
                  
                 <TouchableOpacity
                style={styles.img}
                onPress={() => this.pickImage()}
              >
              <View style={styles.imgShadow}>
              <Image
                  source={require('../assets/WalkingTour.jpg')}
                  style={styles.img}
                />
                
              </View>
              </TouchableOpacity>
                
              </View>
             
              
             
              <Input placeholder='Title' style={{fontSize: 15*1.8, fontWeight: '700'}}/>
              <View style={{flexDirection:"row", justifyContent: 'space-evenly', top: -10}}>
              <View style={{flex:2}}>
                <Item style={{borderColor: 'transparent'}}>
                    <Ionicons name='location-outline' size={16} style={{color: '#0077b6'}}/>
                    <Input placeholder='Address'/>
                </Item>
              </View>
              <View style={{flex:1, paddingTop: 5}}>
                <Item picker style={{borderColor: 'transparent'}}>
                    <Ionicons name='list-outline' size={16} style={{color: '#0077b6'}}/>

                    <Picker
                    mode="dropdown"
                    note={false}
                    mode="dropdown"
                    style={{ width: undefined }}
                    placeholder="Category"
                    selectedValue={this.state.selectedCategory}
                    onValueChange={this.onValueChange.bind(this)}
                    placeholderIconColor="#0077b6"
                    placeholderStyle={{color:'#98b8c3'}}
                    >
                        {categoriesDiv}
                    </Picker>
                </Item>

              </View>

              

              </View>
                <View style={{flexDirection:"row", paddingTop: 10, paddingLeft:5}}> 
                  <View>
                    <View style={{flexDirection:"row",flex:1}}>
                      <View style={styles.date}>
                        <Ionicons name='calendar-outline' size={30} style={{color: '#0077b6'}}/>
                      </View>
                      <View style={{paddingLeft:5}}>
                        <Text style={{fontSize:16,fontWeight:'500'}} >{Moment(dt).format('DD MMM.')}</Text>
                        <Text style={{fontSize:14,color:'#0077b6'}}>Date</Text>
                      </View>
                  </View>
                  </View>
                  <View style={{paddingLeft:10}}>
                    <View style={{flexDirection:"row",flex:1}}>
                      <View style={styles.date}>
                      <Ionicons name='time-outline' size={30} style={{color: '#0077b6'}}/>
                      </View>
                      <View style={{paddingLeft:5}}>
                      <Text style={{fontSize:16,fontWeight:'500'}} >{Moment(dt).format('HH:mm')}</Text>
                      <Text style={{fontSize:14,color:'#0077b6'}}>Time</Text>
                      </View>
                  </View>
                  </View>
                  <View style={{paddingLeft:10}}>
                    <View style={{flexDirection:"row",flex:1}}>
                      <View style={styles.date}>
                        <Ionicons name='pricetag-outline' size={30} style={{color: '#0077b6'}}/>
                      </View>
                      <View style={{paddingLeft:5}}>
                        <Text style={{fontSize:16,fontWeight:'500'}} >€{this.state.event.price}</Text>
                        <Text style={{fontSize:14,color:'#0077b6'}}>Price</Text>
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
              <Button onPress={() => this.props.navigation.navigate("Checkout",{
            eventId: this.state.event._id,})}>
                <Text> Book </Text>
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
      borderRadius: 8
      
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
  outerCard: {

    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
  
  },
  shadow:{
      
      position: 'absolute',
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

})
export default withNavigation(NewEvent)