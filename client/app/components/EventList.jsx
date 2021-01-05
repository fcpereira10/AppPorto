import React, {Component} from 'react'
import {StyleSheet, SafeAreaView, View} from 'react-native'
import {withNavigation} from 'react-navigation'
import EventCard from '../components/EventCard'
import {
  Container,
  Header,
  Content,
  Item,
  Input,
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
        
       <Card transparent style={styles.card}>
       <Item style={styles.search}>
              <Input
                placeholder='Search Events'
                onChange={this.onChange}
                value={this.state.first}
              />
            </Item>
          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <MultiSelect
                hideTags
                items={categories}
                uniqueKey='id'
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedCategories}
                selectText='Select Categories'
                searchInputPlaceholderText='Search Categories'
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor='#CCC'
                tagBorderColor='#CCC'
                tagTextColor='#CCC'
                selectedItemTextColor='#CCC'
                selectedItemIconColor='#CCC'
                itemTextColor='#000'
                displayKey='name'
                searchInputStyle={{color: '#CCC'}}
                submitButtonColor='#CCC'
                submitButtonText='Close'
              />
            </View>
          </SafeAreaView>
          {eventsDiv}
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  search: {
    backgroundColor: 'transparent',
    borderBottomColor: '#ccc',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  categories: {
    backgroundColor: '#ffff',
    borderBottomColor: '#ccc',
  },
  card: {
    width: '95%',
    alignSelf: 'center'
  }
})
export default withNavigation(EventList)
