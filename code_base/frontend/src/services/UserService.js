import HttpService from "./HttpService";

const ApiEndpoint = "http://localhost:8080/";

export default class UserService {

  static async login(username, password) {
    console.log("Test Login");
    // let data = {username: "max", "password": "testPassword-123"};
    let data = {username: username, "password": password}
    return new Promise((resolve, reject) => {
      HttpService.post("http://localhost:8080/users/login", data,
          function (result) {
            resolve(result);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    });
  }

  static async getCurrentUser(){
    return new Promise((resolve, reject) => {
      HttpService.get(ApiEndpoint + "users/cookie",
          function (data) {
            console.log("Got User: " + data._id);
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async getJoinInformation(id){
    return new Promise((resolve, reject) => {
      HttpService.get(ApiEndpoint + "join/"+id,
          function (data) {
            console.log("Got Join Info: " + data);
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async getAddress() {
    this.login();
    return new Promise((resolve, reject) => {
      HttpService.get(ApiEndpoint + "addresses",
          function (data) {
            console.log("Got Addresses: " + data);
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

}
