import { Component, OnInit } from '@angular/core';
import { BookingPlaceService } from '../../services/booking-place.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-booking-place',
  templateUrl: './all-booking-place.component.html',
  styleUrls: ['./all-booking-place.component.css'],
  standalone: true,
  imports: [MatCardModule,CommonModule],
})
export class AllBookingPlaceComponent implements OnInit{

constructor(public bps:BookingPlaceService,public ar:ActivatedRoute) {
  
}
tripCode:number=0;
  ngOnInit(): void {
    this.ar.params.subscribe(p=>
    this.tripCode=p['code'])
    console.log(this.tripCode);
    
    this.bps.get()
    .subscribe(
      succ=>{
        this.bps.AllBookingPlaces=succ;
      },
      err=>{
        alert("err in bp")
      }
    )
  }
}
