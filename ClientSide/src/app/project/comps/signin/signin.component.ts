import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../classes/User';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule
            , MatFormFieldModule, MatInputModule, MatTooltipModule,MatCheckboxModule, FormsModule],

})
export class SigninComponent implements OnInit{

  constructor(public user:UserService,
              public api:ApiService){}

  myForm:FormGroup=new FormGroup({});

  ngOnInit(): void {
    //משתנים עבור כל הפרטים של המשתמש
    this.myForm=new FormGroup(
      {
        'firstName':new FormControl(null,[Validators.required]),
        'lastName':new FormControl(null,[Validators.required]),
        'phone':new FormControl(null,[Validators.required]),
        'email':new FormControl(null,[Validators.required]),
        'loginPassword':new FormControl(null,[Validators.required]),
        'firstAidCertificate':new FormControl(null,[Validators.required])
          
      }
    )
  }
  //קבלת הנתונים מה html 
  get MyFirstName(){return this.myForm.controls['firstName']}
  get MyLastName(){return this.myForm.controls['lastName']}
  get MyPhone(){return this.myForm.controls['phone']}
  get MyEmail(){return this.myForm.controls['email']}
  get MyLoginPass(){return this.myForm.controls['loginPassword']}
  get MyfirstAidCertificate(){return this.myForm.controls['firstAidCertificate']}

  newUser:User=new User();

  send()
  {
    //יצירת משתמש חדש והוספתו
    debugger
    this.newUser.firstName=this.MyFirstName.value,
    this.newUser.lastName=this.MyLastName.value,
    this.newUser.phone=this.MyPhone.value,
    this.newUser.email=this.MyEmail.value,
    this.newUser.loginPassword=this.MyLoginPass.value,
    this.newUser.firstAidCertificate=this.MyfirstAidCertificate.value
    console.log("before:")
    console.log(this.newUser)
    this.user.addUser(this.newUser).subscribe(
      succ=>{
        console.log("================")
        console.log(succ)
      },
      err=>{
        console.log(err)
      }

    )
    // this.api.CurrentUser=this.newUser
  }


}