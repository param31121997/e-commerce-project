import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private useAuthService:UserAuthService, 
    private router: Router,
    public userService: UserService
  ) {
  }

  public isLoggedIn(){
    return this.useAuthService.isLoggedIn();
  }

  public logOut(){
    this.useAuthService.clear();
    this.router.navigate(["/"]);
  }

  public isAdmin(){
    return this.useAuthService.isAdmin();
  }

  public isUser(){
    return this.useAuthService.isUser();
  }

  
}
