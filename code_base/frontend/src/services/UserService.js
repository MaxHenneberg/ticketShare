import HttpService from "./HttpService";

const ApiEndpoint = "http://localhost:8080/";

export default class UserService {

  static async login(username, password) {
    // let data = {username: "max", "password": "testPassword-123"};
    let data = {username: username, "password": password}
    return new Promise((resolve, reject) => {
      HttpService.post("http://localhost:8080/users/login", data,
          function (result) {
            resolve(result);
          }, function (textStatus) {
            reject(textStatus);
          });
    });
  }

  static async logout() {
    return new Promise((resolve, reject) => {
      HttpService.post("http://localhost:8080/users/logout", {},
          function (result) {
            resolve(result);
          }, function (textStatus) {
            reject(textStatus);
          });
    });
  }

  static async getCurrentUser(){
    return new Promise((resolve, reject) => {
      HttpService.get(ApiEndpoint + "users/cookie",
          function (data) {
            resolve(data);
          }, function (textStatus) {
            reject(textStatus);
          });
    })
  }

  static async getJoinInformation(id){
    return new Promise((resolve, reject) => {
      HttpService.get(ApiEndpoint + "join/"+id,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            reject(textStatus);
          });
    })
  }

  static async getAddress() {
    return new Promise((resolve, reject) => {
      HttpService.get(ApiEndpoint + "addresses",
          function (data) {
            resolve(data);
          }, function (textStatus) {
            reject(textStatus);
          });
    })
  }

}
