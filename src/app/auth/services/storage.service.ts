import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  //save token
  static saveToken(token:string){
    //removing previous value each time called
    window.localStorage.removeItem(TOKEN);
    //saving new token
    window.localStorage.setItem(TOKEN, token);
  }

  //saving User object
  static saveUser(user:any){
    window.localStorage.removeItem(USER);
    //objects have to be converted to string first
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  //get token
  static getToken():string{
    //return empty string if a token is not saved
    return localStorage.getItem(TOKEN) || '';
  }

  //get User
  static getUser():any{
    try{
    //get user from storage - saved as a string
    const user = localStorage.getItem(USER);
    //check for null, if not return user as an object
      return user? JSON.parse(user): null;
    }catch{
      return null;
    }
  }


  //method to get user role
  static getUserRole(): string{
    const user = this.getUser();
    if(user == null){
      return ''
    }
    return user.userRole;
  }

   //to check if  logged in by existing token in local
  static isLoggedIn():boolean{
    if(this.getToken() == null){
      return false;
    }
    return true;
  }

   //to check if admin user logged in
  static isAdminUserLoggedIn():boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    //returns true if role is ADMIN
    return role =="ADMIN";
  }

  //to check if supplies div user logged in
  static isSuppliesDivUserLoggedIn():boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    //returns true if role is SUPPLIESUSESR
    return role =="SUPPLIESUSER";
  }
  //to check if admin div user logged in
  static isAdminDivUserLoggedIn():boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    //returns true if role is ADMINDIVUSESR
    return role =="ADMINDIVUSER";
  }
  //to check if sub div user logged in
  static isSubDivUserLoggedIn():boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string = this.getUserRole();
    //returns true if role is SUBDIVUSESR
    return role =="SUBDIVUSER";
  }

  //method to get user id
  static getUserId(): string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.id;
  }

  //log out method - removing from storage
  static logout():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


}
