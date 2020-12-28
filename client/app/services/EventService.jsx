import axios from "axios";
import { AsyncStorage } from "react-native";

export default class EventService {
  constructor() {
    this.ip = "http://192.168.1.66:4000/event";
  }

  async getEvent(data, callback){
    const { eventId } = data;
    await axios
    .get(`${this.ip}/${eventId}`)

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
      const {query} = data;
      await axios
      .get(`${this.ip}/searchEvents/${query}`)
      .then((response)=> {
        callback(response);
      })
      .catch((error => {
          callback(error);
        }))
  }
  
}