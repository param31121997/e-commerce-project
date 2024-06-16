import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080';

  requestHeaders = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public forUser(){
    return this.http.get(this.PATH_OF_API+'/forUser', {
      responseType:'text'
    });
  }

  public forAdmin(){
    return this.http.get(this.PATH_OF_API+'/forAdmin', {
      responseType:'text'
    });
  }

  public login(loginData: any) {
    return this.http.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeaders,
    });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles:any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let role of userRoles) {
        for (let allowedRole of allowedRoles) {
          if (role.roleName === allowedRole) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
