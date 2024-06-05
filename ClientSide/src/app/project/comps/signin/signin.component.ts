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
import { ActivatedRoute } from '@angular/router';

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
              public api:ApiService,
              public ar:ActivatedRoute
          ){}
  currentUser:User=new User();
  status:string=""
  myForm:FormGroup=new FormGroup({});
  ngOnInit(): void {
    this.ar.params.subscribe(
      data=>{
        this.status=data['status']
        if(this.status=="change")
            this.currentUser={...this.api.CurrentUser}
          else
          this.currentUser=new User()
      }
    )
    //משתנים עבור כל הפרטים של המשתמש
    this.myForm=new FormGroup(
      {
        'firstName':new FormControl(this.currentUser.firstName,[Validators.required]),
        'lastName':new FormControl(this.currentUser.lastName,[Validators.required]),
        'phone':new FormControl(this.currentUser.phone,[Validators.required]),
        'email':new FormControl(this.currentUser.email,[Validators.required]),
        'loginPassword':new FormControl(this.currentUser.loginPassword,[Validators.required]),
        'firstAidCertificate':new FormControl(this.currentUser.firstAidCertificate,[Validators.required])
          
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


  send()
  {

    //יצירת משתמש חדש והוספתו
    debugger
    this.currentUser.firstName=this.MyFirstName.value,
    this.currentUser.lastName=this.MyLastName.value,
    this.currentUser.phone=this.MyPhone.value,
    this.currentUser.email=this.MyEmail.value,
    this.currentUser.loginPassword=this.MyLoginPass.value,
    this.currentUser.firstAidCertificate=this.MyfirstAidCertificate.value
    console.log("before:")
    console.log(this.currentUser)
    if(this.status=="new")
      {
      this.user.addUser(this.currentUser).subscribe(
        succ=>{
          alert("you were added successfully")
          console.log(succ)
        },
        err=>{
          console.log(err)
      })
  }
  else{
    this.user.updateUser(this.currentUser).subscribe(
      succ=>{
        alert("changes were saved")
        console.log(succ)
      },
      err=>{
        console.log(err)
      }
    )
  }
  }


}