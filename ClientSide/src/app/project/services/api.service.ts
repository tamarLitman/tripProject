import { Injectable } from '@angular/core';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  basicUrl="https://localhost:7041/api/"
  imgRoute="../../../../assets/pics/"
  CurrentUser:User=new User;
}
