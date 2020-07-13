"use strict";

import GroupsAPISimulator from './GroupsAPISimulator';
import HttpService from "./HttpService";

export default class GroupService {
    static baseURL() {
        return "http://localhost:8080/groups";
    }
    constructor() {
    }

    static getGroups() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
    static getGroupIds() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL() + '/ids', function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
    static getGroup(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${GroupService.baseURL()}/${id}`, function(data) {
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