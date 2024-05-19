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
              public api:ApiService) { }
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
send(){
  if(this.t.availablePlaces)
  {
  if(this.t.availablePlaces>=this.amount)
    {
      alert('you joined!')
      this.t.availablePlaces=this.t.availablePlaces-this.amount;
      console.log("^^^^^^^^^^^^^^^^^^^^^")
      console.log(this.t.availablePlaces)
      this.show=false
    }
  }
  else{
    alert('not enough')
  }


}
}
