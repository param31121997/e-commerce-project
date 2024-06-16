import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {}

  public setRoles(roles:[]){
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles():any{
    let value: string | null = localStorage.getItem('roles');
    if(value as string){
      return JSON.parse(value as string);
    }else{
      return [];
    }
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken():string{
    let value = localStorage.getItem('jwtToken');
      return value as string;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
   console.log(this.getRoles() && this.getToken())
    return this.getRoles() && this.getToken();
  }
} 
