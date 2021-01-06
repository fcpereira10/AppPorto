import axios from "axios";

export default class CategoryService {
  constructor() {
    this.ip = "http://192.168.1.109:4000/user";
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

  
}
