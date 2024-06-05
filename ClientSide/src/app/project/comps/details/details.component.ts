import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { TripService } from '../../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { trip } from '../../classes/trip';
import { MatIconModule } from '@angular/material/icon';
import { BookingPlaces } from '../../classes/BookingPlaces';
import { BookingPlaceService } from '../../services/booking-place.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatIconModule]
})
export class DetailsComponent implements OnInit {
  constructor(public ar:ActivatedRoute,
              public ts: TripService,
              public api:ApiService,
            public bs:BookingPlaceService) { }
code:number=0
t:trip=new trip()
show:Boolean=false;
amount:number=0
ngOnInit():void{
  
// this.ar.params.subscribe(p=>this.code=p["code"])
this.ar.params.subscribe(
  data=>{
    debugger
    console.log("@@@@@@@@@@@@@@@@@")
    this.t=this.ts.AllTrip.find(x=>x.tripCode==data['code'])!
  }
)
}
b:BookingPlaces=new BookingPlaces();
send(){
 
  console.log("??????????????????????")
  debugger
  console.log("!!!!!!!!!!!!!!!!!!!")
  if(this.api.CurrentUser)
  {
    if(this.t.availablePlaces)
    {
    if(this.t.availablePlaces>=this.amount)
      {
        this.b.userCode=this.api.CurrentUser.userCode
        this.b.bookingDate=new Date()
        this.b.tripCode=this.t.tripCode
        this.b.numOfPlaces=this.amount
        this.b.userName=`${this.api.CurrentUser.firstName}`+" "+`${this.api.CurrentUser.lastName}`
        this.b.tripDestination=this.t.tripDestination
        this.b.tripDate=this.t.tripDate
        ///?????????????????????????????????????????????
        // this.b.bookingTime=`${new Date().getHours()}${":"}${new Date().getMinutes()}`
        this.bs.addPlace(this.b).subscribe(
          succ=>{
            console.log("=====")
            console.log(this.b)
            console.log("addtrip")
            console.log("=====")
          },
          err=>{
            alert('not found!!')
          }
        )
        // console.log(this.b)
        alert('you joined!')
        this.t.availablePlaces=this.t.availablePlaces-this.amount;
        console.log("^^^^^^^^^^^^^^^^^^^^^")
        console.log(this.t.availablePlaces)
        this.show=false

      }
      else{
        alert('not enough')
      }
  }
  }



}
}
