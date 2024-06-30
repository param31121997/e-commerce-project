import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup;
  errorMessage:string='';
  constructor(private userService:UserService, private router:Router, private fb:FormBuilder) {
    
  }
  ngOnInit(): void {
     
    this.registerForm = this.fb.group({
      userName:['', Validators.required],
      userFirstName:['', Validators.required],
      userLastName:['', Validators.required],
      userPassword:['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:['',Validators.required]
    }, {validators:this.passwordMatchValidator})
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('userPassword');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { userName, userFirstName, userLastName, userPassword} = this.registerForm.value;
      let formValue = {
          userName:userName,
          userFirstName:userFirstName,
          userLastName:userLastName,
          userPassword:userPassword
      }
      this.userService.registerUser(formValue).subscribe(
        (response) => {
          // Handle successful registration
          this.router.navigate(['/login']); // Redirect to login or another page
        },
        (error) => {
          // Handle registration error
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration failed', error);
        }
      );
    }
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
