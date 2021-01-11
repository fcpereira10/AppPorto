import axios from "axios";

export default class CategoryService {
  constructor() {

    this.ip = "http://192.168.1.112:4000/category";

  }

  async getAllCategories(data, callback){
    console.log("get all categories")
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
}
