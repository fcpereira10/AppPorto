import axios from "axios";
import { AsyncStorage } from "react-native";
export default class EventService {
  constructor() {
    this.ip = "http://192.168.1.102:4000/event";
  }

  async getEvent(data, callback){
    const { eventId } = data;
    await axios
    .get(`${this.ip}/get/${eventId}`)

    .then((response) => {
      console.log(response);
      callback(response);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });

  }
  async getAllEvents(data, callback){
    await axios
    .get(`${this.ip}/`)

    .then((response) => {
      console.log(response);
      callback(response);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });

  }
  async fetchSearchResults(data, callback) {
    console.log("inside fetch");
      const {query} = data;
      console.log(this.ip+"/searchEvents/"+query);
      await axios
      .get(`${this.ip}/search/${query}`)
      .then((response)=> {
        console.log("response "+JSON.stringify(response));
        callback(response);
      })
      .catch((error => {
          callback(error);
        }))
  }
  async filterEventsByCategory(data, callback){
    await axios
    .get(`${this.ip}/filter`, {
      params: {
        categories: data.filter
      }
    })
    .then((response) => {
      console.log(response);
      callback(response);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });

  }
  
}