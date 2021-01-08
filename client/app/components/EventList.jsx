import React, {Component} from 'react'
import {StyleSheet, SafeAreaView, Div} from 'react-native'
import {withNavigation} from 'react-navigation'
import EventCard from './EventCard'
import {Ionicons} from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Text,
  Card,
  CardItem,
  StyleProvider,
  View
} from 'native-base'
import EventService from '../services/EventService'
import CategoryService from '../services/CategoryService'
import MultiSelect from 'react-native-multiple-select'
import HeaderBar from './HeaderBar';

class EventList extends Component {
  static navigationOptions = {
    title: 'EventListHeader',
  }
  constructor (props) {
    super(props)
    this.state = {
      selected: undefined,
      selectedCategories: [],
      events: [],
      categories: []
    }
    this.EventService = new EventService()
    this.CategoryService = new CategoryService()
  }
  onValueChange (value) {
    this.setState({
      selected: value,
    })
  }
  async componentDidMount () {
    await this.EventService.getAllEvents({}, async res => {
      if (res.status == 200) {
        const {data} = res

        this.setState({
          events: data.events,
        })
      }
    })
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
  }
  mapEvents (event) {
    const r = Math.floor(Math.random() * 100)
    const key = event._id + r
    return <EventCard event={event} key={key} />
  }
  onChange = async event => {
    const {text} = event.nativeEvent
    console.log('event ' + text)
    await this.EventService.fetchSearchResults({query: text}, async res => {
      if (res.status == 200) {
        const {data} = res
        console.log('events ' + data.events)
        this.setState({events: data.events})
      }
    })
  }
  onSelectedItemsChange = selectedItems => {
    if(selectedItems.length == 0){
      console.log("LENGTH "+selectedItems.length);
      this.EventService.getAllEvents({}, async res => {
        if (res.status == 200) {
          const {data} = res
  
          this.setState({
            events: data.events,
          })
        }
      })
    }
    else {
    
    this.EventService.filterEventsByCategory({filter: selectedItems}, async res => {
      if (res.status == 200) {
        const {data} = res
        console.log('events ' + data.events)
        this.setState({events: data.events})
      }
    })
   
  }
  this.setState({
    selectedCategories: selectedItems,
  })
  }
  render () {
    const {events, categories, selectedCategories} = this.state
    const eventsDiv = events.map(this.mapEvents.bind(this))
    return (
      
        <Container>
          <Content>
            <HeaderBar/>
            <View style={styles.view1}>
              <View style={styles.view2}>
                <Ionicons name="filter-outline" size={30} color='#03045e' />
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
                submitButtonColor='#00b4d8'
                submitButtonText='Close'
                fontSize={16}
              />
               </View>
          </SafeAreaView>
          </CardItem>
          </Card>
          
  </View>
  <View style={styles.view5}>
    <View style={styles.view6}>
    
      <View style={styles.view3}>
        <View style={styles.view4}>
            {eventsDiv}
          
          </View>
       </View>
        
     
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
    alignSelf: 'center'
  },
  categories: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column'
  },
  categories: {
    backgroundColor: '#fbfcff',
    borderBottomColor: '#fbfcff',
  },
  search: {
    paddingLeft: 0
  },
  view: {
    width: '100%'
  },
  icon: {
    paddingRight: 10
  },
  view1: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
  },
  view2: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      backgroundColor: '#fbfcff',
      zIndex: 2,
      shadowColor: '#03045e',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 7,
  },
  view3:{
    alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 25,
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
  view4: {
    
    width: '100%'
  },
  view5: {
    paddingTop: 180,
  },
  view6: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
  },
  
})
export default withNavigation(EventList)
