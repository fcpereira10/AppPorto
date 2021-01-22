import axios from 'axios'
import {AsyncStorage} from 'react-native'
export default class EventService {
  constructor () {
    this.ip = 'http://192.168.1.100:4000/event'
  }

  async getEvent (data, callback) {
    const {eventId} = data
    await axios
      .get(`${this.ip}/get/${eventId}`)

      .then(response => {
        console.log(response)
        callback(response)
      })
      .catch(error => {
        console.log(error)
        callback(error)
      })
  }
  async getAllEvents (data, callback) {
    await axios
      .get(`${this.ip}/`)

      .then(response => {
        callback(response)
      })
      .catch(error => {
        console.log(error)
        callback(error)
      })
  }
  async fetchSearchResults (data, callback) {
    console.log('inside fetch')
    const {query} = data
    console.log(this.ip + '/searchEvents/' + query)
    await axios
      .get(`${this.ip}/search/${query}`)
      .then(response => {
        console.log('response ' + JSON.stringify(response))
        callback(response)
      })
      .catch(error => {
        callback(error)
      })
  }
  async filterEventsByCategory (data, callback) {
    await axios
      .get(`${this.ip}/filter`, {
        params: {
          categories: data.filter,
        },
      })
      .then(response => {
        console.log(response)
        callback(response)
      })
      .catch(error => {
        console.log(error)
        callback(error)
      })
  }
  async add (data, callback) {
    console.log('add service')

    await axios
      .post(`${this.ip}`, {
        title: data.title,
        description: data.description,
        date: data.date,
        hour: data.hour,
        photo: data.imageBase64,
        address: data.address,
        categoryId: data.selectedCategoryId,
      })
      .then(response => {
        console.log(response)
        callback(response)
      })
      .catch(error => {
        console.log(error)
        callback(error)
      })
  }

  async delete (data, callback) {
  

    await axios
      .delete(`${this.ip}`,
      {params: {eventId: data.eventId}}
      
      )
      .then(response => {
        console.log(response)
        callback(response)
      })
      .catch(error => {
        console.log(error)
        callback(error)
      })
  }
  async edit(data, callback) {
    console.log("edit event service "+data._id)
    await axios
    .put(
      `${this.ip}/edit/${data._id}`,
      data,
    )
    .then(response => {
      console.log(response)
      callback(response)
    })
    .catch(error => {
      console.log(error)
      callback(error)
    })
    
  }

  async checkout(data, callback) {

    let token = "";
    try {
      token = (await AsyncStorage.getItem("token")) || "";
    } catch (error) {
      console.log(error.message);
    }

    console.log("checkout event ");
    await axios
    .post(`${this.ip}/checkout`, 
    data,  
    {
      headers: { Authorization: `Token ${token}` },
    })
    .then(response => {
      console.log(response)
      callback(response)
    })
    .catch(error => {
      console.log(error)
      callback(error)
    })
  }
}
