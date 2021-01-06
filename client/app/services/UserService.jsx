import axios from "axios";
import { AsyncStorage } from "react-native";

export default class CategoryService {
  constructor() {
    this.ip = "http://192.168.1.102:4000/user";
  }

  async getAllBookingsByUser(data, callback){
    const { userId } = data;
    await axios
    .get(`${this.ip}/${userId}/bookings`)

    .then((response) => {
      console.log(response);
      callback(response);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });

  }
  async login(data, callback) {
    console.log("login")
    axios
      .post(`${this.ip}/login`, {
        username: data.username,
        password: data.password,
      })
      .then(async (response) => {
        try {
          if (response.status === 200)
            await AsyncStorage.setItem("token", response.data.user.token);
        } catch (error) {
          console.log(error.message);
        }
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  add(data, callback) {
    console.log("add")
    axios
      .post(this.ip, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        callback(response);
      })
      .catch((error) => {
        console.log("error "+error);
        callback(error);
      });
  }

  
}
