import HttpService from "./HttpService";

const GroupApiEndpoint = "http://localhost:8080/group";

export default class GroupService {

  // static async login() {
  //   console.log("Test Login");
  //   let data = {username: "max", "password": "testPassword-123"};
  //   return new Promise((resolve, reject) => {
  //     HttpService.post("http://localhost:8080/users/login", data,
  //         function (result) {
  //           resolve(result);
  //         }, function (textStatus) {
  //           console.error("Error in Get:" + textStatus);
  //           reject(textStatus);
  //         });
  //   });
  // }

  static async getGroupById(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(GroupApiEndpoint + "?id=" + id + "&populate=true",
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async countOccSlots(groupId) {
    // return fetch(GroupApiEndpoint+"/occSlots?group="+groupId).then(response => response.json());
    return new Promise((resolve, reject) => {
      HttpService.get(GroupApiEndpoint + '/occSlots?group=' + groupId + "",
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }
}
