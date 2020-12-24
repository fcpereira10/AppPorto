import axios from "axios";
import { AsyncStorage } from "react-native";

export default class EventService {
  constructor() {
  }

  async getEvent(data, callback){
    axios
    .get('https://localhost:4000/events/5fe4b4d4c6dd2a9cb83b5bee')
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      callback(error);
    });

  }
  
}