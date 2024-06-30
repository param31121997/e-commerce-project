import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private userService:UserService, private userAuthService:UserAuthService, private router:Router,     private fb: FormBuilder,
  ){

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }
  // onSubmit(loginForm:NgForm){
  //   this.userService.login(loginForm.value).subscribe((res:any) =>{
  //     this.userAuthService.setRoles(res.user.role);
  //     this.userAuthService.setToken(res.jwtToken);
  //     const role = res.user.role[0].roleName;
  //     if(role === "Admin"){
  //       this.router.navigate(["/admin"]);
  //     }else{
  //       this.router.navigate(["/user"]);
  //     }
  //   },(error) =>{
  //     console.log(error);
  //   }
  // )
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // const { username, password } = this.loginForm.value;
      this.userService.login(this.loginForm.value).subscribe(
        (res:any) => {
          this.userAuthService.setRoles(res.user.role);
      this.userAuthService.setToken(res.jwtToken);
      const role = res.user.role[0].roleName;
      if(role === "Admin"){
        this.router.navigate(["/admin"]);
      }else{
        this.router.navigate(["/user"]);
      }
        },
        (error) => {
          this.errorMessage = 'Incorrect username or password';  // Set error message
          console.error('Login failed', error);
        }
      );
    }
  }

  public registerUser(){
    this.router.navigate(["/registerUser"])
  }

}
