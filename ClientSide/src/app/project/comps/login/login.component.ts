import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../classes/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule
    , MatFormFieldModule, MatInputModule, MatTooltipModule, CommonModule],
})
export class LoginComponent implements OnInit {
  constructor(public user: UserService,
    public api: ApiService,
    public r: Router) { }

  myForm: FormGroup = new FormGroup({});
  allUsers:Array<User>= new Array<User>();
  hide = true;
  ngOnInit(): void {
    //מייל וסיסמא לכניסה
    this.myForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'pass': new FormControl(null, [Validators.required])
      }
    );
    this.user.getAllUsers().subscribe(
      succ=>{
        this.allUsers=succ
      },
      err=>{
        alert('cannot get users')
      }
    )
  }

  get Email() { return this.myForm.controls['email'] }
  get Pass() { return this.myForm.controls['pass'] }

  send() {

    this.user.getByEmailAndPass(this.Email.value, this.Pass.value)
      .subscribe(
        //אם המשתמש חדש מעביר להרשמה אחרת לטיולים
        succ => {
          console.log('=====')
          console.log(succ)
          if (succ == null)
          {
            if(this.allUsers.find(x=>x.email==this.Email.value))
              alert('not correct password')
            this.r.navigate(['SignIn'])
          }
          else {
            alert("hello ")
            console.log("before:")
            console.log(this.api.CurrentUser)
            this.api.CurrentUser = succ;
            console.log("after:")
            console.log(this.api.CurrentUser)  
            this.r.navigate(['AllTrips'])
          }

        },
        err => {
          console.log("================")
          console.log(err)
   
        }
      )
  }
}