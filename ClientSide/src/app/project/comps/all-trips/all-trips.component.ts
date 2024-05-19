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

  // listTrips = new trip();
    selectedType:Number=0;
    
  ngOnInit(): void {
    debugger
    this.ts.getAll()
      .subscribe(
        succ => {
          this.ts.AllTrip = succ
          console.log(this.ts.AllTrip);
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
  select(){
    // this.selectedType=t
  }
send(t:number)
{
  console.log("###############")
  console.log(t)
  this.route.navigate([`./details/${t}`])
}
}
