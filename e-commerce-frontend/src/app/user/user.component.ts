import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  message: any;
  constructor(private userService: UserService) {
    

    
  }
  ngOnInit(): void {
    this.forUser();
  }

  forUser(){
    this.userService.forUser().subscribe((res) =>{
      console.log(res)
      this.message  = res;
    }, (error)=>{
      console.log(error)
    })
  }
}
