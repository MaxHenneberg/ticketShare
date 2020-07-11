import HttpService from './HttpService';

export default class GroupService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:8080/group/' }

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

    static getGroup(id) {
        return new Promise((resolve, reject) => {
            var url = GroupService.baseURL()+id;
            console.log(url);
            HttpService.get(url, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving group');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static getFreeSlots(id){
        return new Promise((resolve, reject) => {
            var url = GroupService.baseURL()+"info/freeslots/"+id;
            console.log(url);
            HttpService.get(url, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving group');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }
    static createGroup(data) {
        return new Promise((resolve, reject) => {
            var url = GroupService.baseURL()+"create";
            console.log(url);
            HttpService.post(url, data, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving group');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

  static async initGroupJoin(id) {
    console.log("Init Group Join");
    const body = {group: id};
    return new Promise((resolve, reject) => {
      HttpService.post(GroupService.baseURL() + "/initJoin", body,
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
      HttpService.post(GroupService.baseURL() + "/revertInitJoin", body,
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
      HttpService.get(GroupService.baseURL() +`/verifyPayment?orderId=${orderId}&payerId=${payerId}`,
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
      HttpService.get(GroupService.baseURL() + '/occSlots?group=' + groupId + "",
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }
}

}
