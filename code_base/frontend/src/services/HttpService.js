"use strict"
 export default class HttpService{
  constructor(){

  }

   static apiURL() {return 'http://localhost:3000'; }

   static async get(url, onSuccess, onError) {
    console.log("Get");
     try {
       let resp = await fetch(url, {
         method: 'GET',
         withCredentials: true,
         credentials:'include'

       });
      console.log("fetch: "+resp);
       if(this.checkIfUnauthorized(resp)) {
         window.location = '/#/';
       } else {
         resp = await resp.json();
       }

       if(resp.error) {
         onError(resp.error);
       } else {
         // if(resp.hasOwnProperty('token')) {
         //   window.localStorage['jwtToken'] = resp.token;
         // }
         onSuccess(resp);
       }
     } catch(err) {
       console.error(err);
       onError(err.message);
     }

     // fetch(url, {
     //     method: 'GET',
     //     headers: header
     // }).then((resp) => {
     //     if(this.checkIfUnauthorized(resp)) {
     //         window.location = "/#login";
     //     }
     //     else {
     //         return resp.json();
     //     }
     // }).then((resp) => {
     //     if(resp.error) {
     //         onError(resp.error);
     //     }
     //     else {
     //         if(resp.hasOwnProperty('token')) {
     //             window.localStorage['jwtToken'] = resp.token;
     //         }
     //         onSuccess(resp);
     //     }
     // }).catch((e) => {
     //     onError(e.message);
     // });
   }

   static async put(url, data, onSuccess, onError) {
     let header = new Headers();
     header.append('Content-Type', 'application/json');

     try {
       let resp = await fetch(url, {
         method: 'PUT',
         headers: header,
         body: JSON.stringify(data)
       });

       if(this.checkIfUnauthorized(resp)) {
         window.location = '/#login';
         return;
       }
       else {
         resp = await resp.json();
       }

       if(resp.error) {
         onError(resp.error);
       }
       else {
         if(resp.hasOwnProperty('token')) {
           window.localStorage['jwtToken'] = resp.token;
         }
         onSuccess(resp);
       }
     } catch(err) {
       onError(err.message);
     }
   }

   static async post(url, data, onSuccess, onError) {
     let header = new Headers();
     header.append('Content-Type', 'application/json');

     try {
       let resp = await fetch(url, {
         method: 'POST',
         headers: header,
         withCredentials: true,
         credentials:'include',
         body: JSON.stringify(data)
       });

       if(this.checkIfUnauthorized(resp)) {
         console.error("Not Authorized");
         window.location = '/#';
         return;
       }
       else {
         resp = await resp;
         console.log("Resp: "+resp);
       }

       if(resp.error) {
         onError(resp.error);
       }
       else {
         onSuccess(resp);
       }
     } catch(err) {
       onError(err.message);
     }
   }

   static async remove(url, onSuccess, onError) {

     try {
       let resp = await fetch(url, {
         method: 'DELETE',
       });

       if(this.checkIfUnauthorized(resp)) {
         window.location = '/#login';
         return;
       }
       else {
         resp = await resp.json();
       }

       if(resp.error) {
         onError(resp.error);
       }
       else {
         onSuccess(resp)
       }
     } catch(err) {
       onError(err.message);
     }
   }

   static checkIfUnauthorized(res) {
     if(res.status === 401) {
       console.error("Not Authorized");
       return true;
     }
     return false;
   }
 }