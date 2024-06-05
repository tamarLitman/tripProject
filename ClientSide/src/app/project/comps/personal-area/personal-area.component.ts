import { Component, OnInit } from '@angular/core';
import { BookingPlaceService } from '../../services/booking-place.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { trip } from '../../classes/trip';
import { CommonModule } from '@angular/common';
import { TripType } from '../../classes/TripType';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,RouterModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,MatTooltipModule, MatIconModule],

})
export class PersonalAreaComponent implements OnInit {

  constructor(public r:Router,
    public a:ApiService,
    public u:UserService,
    public ts:TripService,
    public b:BookingPlaceService) { }
  
    
  selectedTime:number=0
  sort:number=0
  CurrentUserTrips:Array<trip>=new Array<trip>()
  filterTrips:Array<trip>=new Array<trip>()

    ngOnInit(): void {
      debugger
      this.u.getTrips(this.a.CurrentUser.userCode)
        .subscribe(
          succ => {
            this.filterTrips=succ
            this.CurrentUserTrips = succ
            console.log(this.CurrentUserTrips);
          },
          err => {
            alert('failed')
          }
  
        )
        this.ts.getAllTypes()
        .subscribe(
          succ => {
            this.ts.AllTypes = succ
            console.log(this.ts.AllTypes);
          },
          err => {
            alert('failed')
          }
        )
    
  }
  //edit user details
  change()
  {
    this.r.navigate(['./SignIn/change'])
  }
  //delete this user
  delete()
  {
    debugger
    this.u.deleteUser(this.a.CurrentUser.userCode!).subscribe(
      succ=>{
        if(succ==true)
          alert("deleted successfully")
        else
         alert("you have trips in the future you cant be deleted")
      },
      err=>{
        console.log("err")
      }
    )
  }

  //filter by time
  filterByTime(selectedTime:number)
  {
    debugger
    if(selectedTime==1){
      this.filterTrips= this.CurrentUserTrips.filter(t=>new Date(t.tripDate!)<new Date())}
    else{
      this.filterTrips= this.CurrentUserTrips.filter(t=>new Date(t.tripDate!)>new Date())}
  }
  //sort by trip type or price
  sortTrips(sort:number){
    if(sort==1)
      this.filterTrips=this.CurrentUserTrips.sort((t,t1)=>t.typeCode!-t1.typeCode!)
    else
      this.filterTrips=this.CurrentUserTrips.sort((t,t1)=>t.price!-t1.price!)

  }
  //can cancle if the  trip is in the future
  canCancle(t:trip):boolean
  {
    if(new Date(t.tripDate!)>new Date)
      return true
    return false
  }

  booking:any
  
  //cancel the booking for this trip
  async cancel(t:trip){
    debugger
    const bookingPlaces=await this.b.get().toPromise()
    this.booking= bookingPlaces.filter((x:any)=>x.tripCode==t.tripCode && x.userCode==this.a.CurrentUser.userCode)
    const res=await this.b.deletePlace(this.booking[0].bookingCode!).toPromise()
    if(res==true)
      {
        alert("canceled successfully")
        console.log("true")
      }
      else
      console.log("false")
  }

}
