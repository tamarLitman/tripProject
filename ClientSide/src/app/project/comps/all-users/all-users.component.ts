import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  standalone: true,
  imports: [MatCardModule,CommonModule],
})

export class AllUsersComponent implements OnInit{
  
constructor(public us:UserService) {
  
}
  ngOnInit(): void {
    this.us.getAllUsers()
    .subscribe(
      succ=>{
        this.us.allUsers=succ
        console.log(this.us.allUsers); 
      },     
      err=>{
        alert('err')
      }
    )
  }

}
