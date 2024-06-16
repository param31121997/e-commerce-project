import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService:UserService, private userAuthService:UserAuthService, private router:Router){

  }
  login(loginForm:NgForm){
    this.userService.login(loginForm.value).subscribe((res:any) =>{
      this.userAuthService.setRoles(res.user.role);
      this.userAuthService.setToken(res.jwtToken);
      const role = res.user.role[0].roleName;
      if(role === "Admin"){
        this.router.navigate(["/admin"]);
      }else{
        this.router.navigate(["/user"]);
      }
    },(error) =>{
      console.log(error);
    }
  )
  }
}
