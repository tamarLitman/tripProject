import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { trip } from '../../classes/trip';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TripType } from '../../classes/TripType';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,RouterModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
})
export class AllTripsComponent implements OnInit {

  constructor(public ar:ActivatedRoute,
    public ts: TripService,
    public a:ApiService,
    public route:Router) { }

    allTimes=["today","this-week","future","past"];
    selectedTime:string="future";
    Today:Date=new Date();
    selectedType:number=0;
    
    
  ngOnInit(): void {
    this.Today=new Date()
    debugger
    //get all trips
    this.ts.getAll()
      .subscribe(
        succ => {
          this.ts.FilterTrip=succ
          this.ts.AllTrip = succ
          console.log(this.ts.AllTrip);
        },
        err => {
          alert('failed')
        }

      )
    //get all type's
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
  futureTrip(date?:Date)
  {
    return new Date(date!)>this.Today
  }
  //filter by trip type
  filter(selectedType:number){
    this.ts.FilterTrip=this.ts.FilterTrip.filter(t=>t.typeCode==selectedType)
  }
  filterTime()
  {
    debugger
    if(this.selectedTime=="today")
      this.ts.FilterTrip=this.ts.AllTrip.filter(t=>new Date(t.tripDate!)==new Date())
    else if(this.selectedTime=="past")
      this.ts.FilterTrip=this.ts.AllTrip.filter(t=>new Date(t.tripDate!)<new Date())
    else if(this.selectedTime=="future")
      this.ts.FilterTrip=this.ts.AllTrip.filter(t=>new Date(t.tripDate!)>new Date())
    else if(this.selectedTime=="this week")
      this.ts.FilterTrip=this.ts.FilterTrip.filter(t=>Math.abs((new Date(t.tripDate!).getDay()-this.Today.getDay()))<=7
                                                    && new Date(t.tripDate!).getMonth()==this.Today.getMonth() 
                                                     && new Date(t.tripDate!).getFullYear()==this.Today.getFullYear())

  }

  //to see details
  send(t:number)
  {
    console.log(t)
    this.route.navigate([`./details/${t}`])
  }
  orders(t:number){
    this.route.navigate([`./orders/${t}`]);
  }

  add(t:number){
    console.log("code");
    console.log(t);
    this.route.navigate([`./tripForm/${t}`]);
  }
}
