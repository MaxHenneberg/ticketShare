import HttpService from './HttpService';

export default class GroupService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:8080/group/' }

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

}