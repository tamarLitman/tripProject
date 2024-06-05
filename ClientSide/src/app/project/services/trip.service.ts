import { Injectable } from '@angular/core';
import { trip } from '../classes/trip';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { TripType } from '../classes/TripType';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  FilterTrip:Array<trip>=new Array<trip>()
  AllTrip: Array<trip>=new Array<trip>;
  AllTypes:Array<TripType>=new Array<TripType>;
  constructor(public ht:HttpClient,
              public a:ApiService) { }
  getAll():Observable<Array<trip>>
  {
    return this.ht.get<Array<trip>>(this.a.basicUrl+"Trip")
  }
  addTrip(t: trip):Observable<Number>
  {
    return this.ht.post<Number>(this.a.basicUrl+"Trip",t)
  }
  getAllTypes():Observable<Array<TripType>>
  {
    return this.ht.get<Array<TripType>>(this.a.basicUrl+"TripType")
  }
  getByCode(code:number):Observable<trip>
  {
    console.log("++++++++");
    console.log(this.a.basicUrl+"Trip/:"+code);
    debugger
    return this.ht.get<trip>(this.a.basicUrl+"Trip/"+code)
  }
}
