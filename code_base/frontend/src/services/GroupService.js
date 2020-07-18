import HttpService from './HttpService';

export default class GroupService {

  constructor() {
  }

  static baseURL() {
    return 'http://localhost:8080/group/'
  }

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
      var url = GroupService.baseURL() + id;
      HttpService.get(url, function (data) {
        if (data != undefined || Object.keys(data).length !== 0) {
          resolve(data);
        } else {
          reject('Error while retrieving group');
        }
      }, function (textStatus) {
        reject(textStatus);
      });
    });
  }

  static getFreeSlots(id) {
    return new Promise((resolve, reject) => {
      var url = GroupService.baseURL() + "info/freeslots/" + id;
      HttpService.get(url, function (data) {
        if (data != undefined || Object.keys(data).length !== 0) {
          resolve(data);
        } else {
          reject('Error while retrieving group');
        }
      }, function (textStatus) {
        reject(textStatus);
      });
    });

  }

  static createGroup(data) {
    return new Promise((resolve, reject) => {
      var url = GroupService.baseURL() + "create";
      HttpService.post(url, data, function (data) {
        if (data != undefined || Object.keys(data).length !== 0) {
          resolve(data);
        } else {
          reject('Error while retrieving group');
        }
      }, function (textStatus) {
        reject(textStatus);
      });
    });
  }

  static async initGroupJoin(id) {
    const body = {group: id};
    return new Promise((resolve, reject) => {
      HttpService.post(GroupService.baseURL() + "join/initJoin", body,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            reject(textStatus);
          });
    })
  }

  static async revertInitGroupJoin(id) {
    const body = {group: id};
    return new Promise((resolve, reject) => {
      HttpService.post(GroupService.baseURL() + "join/revertInitJoin", body,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            reject(textStatus);
          });
    })
  }

  static async verifyPayment(orderId, payerId) {
    return new Promise((resolve, reject) => {
      HttpService.get(GroupService.baseURL() + `join/verifyPayment?orderId=${orderId}&payerId=${payerId}`,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            reject(textStatus);
          });
    })
  }

  static async countOccSlots(groupId) {
    return new Promise((resolve, reject) => {
      HttpService.get(GroupService.baseURL() + 'info/occSlots?group=' + groupId,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            reject(textStatus);
          });
    })
  }

  static async joinInfosForGroup(groupId) {
    return new Promise((resolve, reject) => {
      HttpService.get(GroupService.baseURL() + "joinInformation/byGroupId?groupId=" + groupId,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async deliverTicket(joinInfoId, file) {
    return new Promise((resolve, reject) => {
      HttpService.put(`http://localhost:8080/joinInformation/${joinInfoId}?ticketDelivered=true`, {},
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async receiveTicket(joinInfoId) {
    return new Promise((resolve, reject) => {
      HttpService.put(`http://localhost:8080/joinInformation/${joinInfoId}?ticketReceived=true`, {},
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

  static async search(searchFields, limit) {
    let query = "";
    Object.keys(searchFields).filter(key => searchFields[key]).forEach(key => (query += `${key}=${searchFields[key]}&`));
    query = query.substring(0, query.length - 1);
    console.log(query);
    return new Promise((resolve, reject) => {
      HttpService.get( `http://localhost:8080/groups/search?${query}&limit=${limit}`,
          function (data) {
            resolve(data);
          }, function (textStatus) {
            console.error("Error in Get:" + textStatus);
            reject(textStatus);
          });
    })
  }

}
