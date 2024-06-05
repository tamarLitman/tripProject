import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingPlaces } from '../classes/BookingPlaces';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class BookingPlaceService {

  constructor(public ht:HttpClient,
              public a:ApiService
  ) { }
  get():Observable<any>
  {
    return this.ht.get<Array<BookingPlaces>>(this.a.basicUrl+"BookingPlace")
  }
  
  addPlace(place:BookingPlaces):Observable<Number>
  {
    return this.ht.post<Number>(this.a.basicUrl+"BookingPlace",place)
  }
  getByTrip(code:number):Observable<Array<BookingPlaces>>
  {
    return this.ht.get<Array<BookingPlaces>>(this.a.basicUrl+"BookingPlace/:"+code)
  }
  deletePlace(code:number):Observable<any>
  {
    return this.ht.delete<Boolean>(this.a.basicUrl+`BookingPlace/delete/${code}`)
  }
  AllBookingPlaces: Array<BookingPlaces>=new Array<BookingPlaces>;

 
}
