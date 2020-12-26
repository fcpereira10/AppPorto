import axios from "axios";
import { AsyncStorage } from "react-native";

export default class EventService {
  constructor() {
  }

  async getEvent(data, callback){
    const { eventId } = data;
    await axios
    .get(`http://192.168.1.66:4000/event/${eventId}`)

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