import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService:UserService, private router:Router) {
    
  }


  public registerUser(form:NgForm){
    this.userService.registerUser(form.value).subscribe((res) =>{
        console.log(res);
        this.router.navigate(["/login"])
    }, (err:HttpErrorResponse) =>{
      console.log(err)
    })
    console.log(form.value)
  }
}
