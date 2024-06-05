import { Injectable } from '@angular/core';
import { User } from '../classes/User';
import { trip } from '../classes/trip';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(){
    this.admin.email="men@gmail.com"
    this.admin.loginPassword="1"
    window.localStorage.setItem("admin",JSON.stringify(this.admin))
   }
  admin:User=new User()
  isAdmin=false
  basicUrl="https://localhost:7041/api/"
  imgRoute="../../../../assets/pics/"
  CurrentUser:User=new User();
}
