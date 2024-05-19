import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public ht:HttpClient,
              public a:ApiService) { }
              
  getByEmailAndPass(email:string,pass:string):Observable<any>
  {
    let params=new HttpParams();
    params=params.set('email',email);
    params=params.set('password',pass);
    return this.ht.get<User>(`${this.a.basicUrl}User/GetByMailAndPass`,{params});
  }
  addUser(user:User):Observable<Number>
  {
    return this.ht.post<Number>(this.a.basicUrl+"User",user)
  }
  getAllUsers():Observable<Array<User>>
  {
    return this.ht.get<Array<User>>(this.a.basicUrl+"User")
  }
}
