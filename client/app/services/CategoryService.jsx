import axios from "axios";

export default class CategoryService {
  constructor() {

    this.ip = "http://192.168.1.107:4000/category";

  }

  async getAllCategories(data, callback){
   
    await axios
    .get(`${this.ip}/`)

    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });

  }
}
