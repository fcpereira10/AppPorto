import React, {Component} from 'react'
import {StyleSheet, SafeAreaView, AsyncStorage } from 'react-native'
import {withNavigation, NavigationEvents} from 'react-navigation'
import EventCard from './EventCard'
import {Ionicons} from '@expo/vector-icons'
import {
  Container,
  Content,
  Input,
  Card,
  CardItem,
  View,
} from 'native-base'
import EventService from '../services/EventService'
import CategoryService from '../services/CategoryService'
import UserService from '../services/UserService'
import MultiSelect from 'react-native-multiple-select'
import HeaderBar from './HeaderBar'
import AddEventButton from './AddEventButton'

class EventList extends Component {
  static navigationOptions = {
    title: 'Events',
  }
  constructor (props) {
    super(props)
    this.state = {
      selected: undefined,
      selectedCategories: [],
      events: [],
      categories: [],
      isAdmin: false,
    }
    this.EventService = new EventService()
    this.CategoryService = new CategoryService()
    this.UserService = new UserService()
  }
  onValueChange (value) {
    this.setState({
      selected: value,
    })
  }
  async load(){
    await this.EventService.getAllEvents({}, async res => {
      if (res.status == 200) {
        const {data} = res
        this.setState({
          events: data.events,
        })
      }
    })
  }
  async componentDidMount () {
    let token = ""
    try {
      token = (await AsyncStorage.getItem('token')) || ''
      console.log("token "+token)
    } catch (error) {
      console.log("error "+error.message)
    }
    console.log("token length "+token.length)
    if (token.length > 0) {
    await this.UserService.getUser(async res => {
      if (res.status == 200){
        const {payload} = res.data;
        this.setState({
          isAdmin: payload.isAdmin,
        })
      }

    })
  }
    await this.load();
   
    await this.CategoryService.getAllCategories({}, async res => {
      
      if (res.status == 200) {
        const {data} = res
        let arr = []
        data.categories.map(category => {
          arr.push({id: category._id, name: category.description})
        })

        this.setState({
          categories: arr,
        })
      }
    })
  }
  mapEvents (event) {
    const r = Math.floor(Math.random() * 100)
    const key = event._id + r
    return <EventCard event={event} key={key} />
  }
  onChange = async event => {
    const {text} = event.nativeEvent
    await this.EventService.fetchSearchResults({query: text}, async res => {
      if (res.status == 200) {
        const {data} = res
        this.setState({events: data.events})
      }
    })
  }
  onSelectedItemsChange = selectedItems => {
    if (selectedItems.length == 0) {
      this.EventService.getAllEvents({}, async res => {
        if (res.status == 200) {
          const {data} = res

          this.setState({
            events: data.events,
          })
        }
      })
    } else {
      this.EventService.filterEventsByCategory(
        {filter: selectedItems},
        async res => {
          if (res.status == 200) {
            const {data} = res
            this.setState({events: data.events})
          }
        },
      )
    }
    this.setState({
      selectedCategories: selectedItems,
    })
  }
  render () {
    const {events, categories, selectedCategories, isAdmin} = this.state
    const eventsDiv = events.map(this.mapEvents.bind(this))
    return (
      <Container>
       <NavigationEvents onDidFocus={() => this.load()} />
        <Content>
          <HeaderBar />
          <View style={styles.view1}>
            <View style={styles.view2}>
              <Ionicons name='filter-outline' size={30} color='#03045e' />
            </View>
            <View style={styles.view3}>
              <Card transparent>
                <CardItem>
                  <Input
                    placeholder='Search Events'
                    onChange={this.onChange}
                    value={this.state.first}
                    style={styles.search}
                  />
                </CardItem>
                <CardItem>
                  <SafeAreaView style={styles.view}>
                    <View>
                      <MultiSelect
                        hideTags
                        items={categories}
                        uniqueKey='id'
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={selectedCategories}
                        selectText='Select Categories '
                        searchInputPlaceholderText='Search Categories'
                        onChangeInput={text => console.log(text)}
                        tagRemoveIconColor='#00b4d8'
                        tagBorderColor='#00b4d8'
                        tagTextColor='#00b4d8'
                        selectedItemTextColor='#00b4d8'
                        selectedItemIconColor='#00b4d8'
                        itemTextColor='#03045e'
                        displayKey='name'
                        success={'#00b4d8'}
                        text={'#03045e'}
                        itemBackground={'#fbfcff'}
                        searchPlaceholderTextColor='#fbfcff'
                        searchInputStyle='#03045e'
                        searchSelectionColor='#fbfcff'
                        submitButtonColor='#0077b6'
                        submitButtonText='Close'
                        fontSize={16}
                      />
                    </View>
                  </SafeAreaView>
                </CardItem>
              </Card>
            </View>
          </View>
          <View style={styles.view5}>
            <View style={styles.view6}>
              <View style={styles.view7}>
                <View style={styles.view4}>{eventsDiv}</View>
              </View>
              <View>
              {isAdmin && <AddEventButton />}
              </View>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  filters: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    width: '95%',
    alignSelf: 'center',
  },
  categories: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  categories: {
    backgroundColor: '#fbfcff',
    borderBottomColor: '#fbfcff',
  },
  search: {
    paddingLeft: 0,
  },
  view: {
    width: '100%',
  },
  icon: {
    paddingRight: 10,
  },
  view1: {
    zIndex: 2,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
    paddingBottom: 25,
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
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  view3: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 25,
    width: '95%',

    borderRadius: 8,
    backgroundColor: '#fbfcff',

    shadowColor: '#03045e',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  view4: {
    width: '100%',
  },
  view5: {
    paddingTop: 180,
  },
  view6: {
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
    paddingBottom: 50,
  },
  view7: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    width: '95%',
    borderRadius: 8,
    backgroundColor: '#fbfcff',

    shadowColor: '#03045e',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
})
export default withNavigation(EventList)
