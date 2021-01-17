import axios from 'axios'
import {AsyncStorage} from 'react-native'

export default class UserService {
  constructor () {

    this.ip = 'http://192.168.1.107:4000/user'

  }

  async getAllBookingsByUser (data, callback) {
    
    let token = ""
    try {
      token = (await AsyncStorage.getItem('token')) || ''
      
    } catch (error) {
      console.log("error "+error.message)
    }
    await axios
      .get(`${this.ip}/bookings`, {
        headers: {Authorization: `Token ${token}`},
      })
      .then(response => {
        console.log(" resp " +response)
        callback(response)
      })
      .catch(error => {
        console.log("error 2 "+error)
        callback(error)
      })
  }
  async login (data, callback) {
    
    axios
      .post(`${this.ip}/login`, {
        username: data.username,
        password: data.password,
      })
      .then(async response => {
        try {
          if (response.status === 200)
            await AsyncStorage.setItem('token', response.data.user.token)
        } catch (error) {
          console.log(error.message)
        }
        callback(response)
      })
      .catch(error => {
        callback(error)
      })
  }

  async add (data, callback) {
    console.log('add')
    axios
      .post(this.ip, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(response => {
        console.log(response)
        callback(response)
      })
      .catch(error => {
        console.log('error ' + error)
        callback(error)
      })
  }
  async edit (data, callback) {
    let token = ""
    try {
      token = (await AsyncStorage.getItem('token')) || ''
      console.log(token)
    } catch (error) {
      console.log(error.message)
    }
    axios
      .put(
        this.ip,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          headers: {Authorization: `Token ${token}`},
        }
      )
      .then(response => {
        console.log(response)
        callback(response)
      })
      .catch(error => {
        console.log('error ' + error)
        callback(error)
      })
  }
  async getUser (callback) {
    
    let token = ''
    try {
      token = (await AsyncStorage.getItem('token')) || ''
    } catch (error) {
      console.log(error.message)
    }
    axios
      .get(`${this.ip}/current`, {
        headers: {Authorization: `Token ${token}`},
      })
      .then(response => {
        callback(response)
      })
      .catch(error => {
        console.log(error)
        callback(error)
      })
  }
}
