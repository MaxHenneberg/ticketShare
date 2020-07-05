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
            console.log("GroupService: " + data._id);
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async initGroupJoin(id) {
    console.log("Init Group Join");
    const body = {group: id};
    return new Promise((resolve, reject) => {
      HttpService.post(GroupApiEndpoint + "/initJoin", body,
          function (data) {
            console.log("GroupJoin:" + data._id);
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Post:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async revertInitGroupJoin(id) {
    console.log("Revert Init Group Join");
    const body = {group: id};
    return new Promise((resolve, reject) => {
      HttpService.post(GroupApiEndpoint + "/revertInitJoin", body,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Post:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async verifyPayment(orderId, payerId) {
    return new Promise((resolve, reject) => {
      HttpService.get(GroupApiEndpoint +`/verifyPayment?orderId=${orderId}&payerId=${payerId}`,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async countOccSlots(groupId) {
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
