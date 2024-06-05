import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { TripService } from '../../services/trip.service';
import { MatButtonModule } from '@angular/material/button';
import { trip } from '../../classes/trip';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule
  ],
})
export class TripFormComponent implements OnInit {
    hideRequiredControl = new FormControl(false);
    floatLabelControl = new FormControl('auto' as FloatLabelType);
    options = this._formBuilder.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  
    constructor(private _formBuilder: FormBuilder,
                public api:ApiService,
                public ts:TripService,
              public ar:ActivatedRoute) {}

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  thisTrip:trip=new trip()
  thisTripCode:number=0;
  myForm:FormGroup=new FormGroup({})
  ngOnInit(): void {
    this.ar.params.subscribe(p=>this.thisTripCode=p["code"])
    this.ts.getByCode(this.thisTripCode)
    .subscribe(
      succ=> {
        console.log("~~~~~~~~~~~~~~~~");
        console.log(succ);
        this.thisTrip=succ;
        this.myForm=new FormGroup(
          {
            'dest':new FormControl(this.thisTrip.tripDestination,[Validators.required]),
            'typeCode':new FormControl(this.thisTrip.typeCode ,[Validators.required]),
            'date':new FormControl(this.thisTrip.tripDate,[Validators.required]),
            'duration':new FormControl(this.thisTrip.tripDurationHours,[Validators.required]),
            'places':new FormControl(this.thisTrip.availablePlaces,[Validators.required]),
            'price':new FormControl(this.thisTrip.price,[Validators.required]),
            'photo':new FormControl(this.thisTrip.photo,[Validators.required]),
          })
      },
      err=>{
        alert('failed')
        console.log(err);
      })
    this.myForm=new FormGroup(
      {
        //משתנים להוספת טיול
        'dest':new FormControl(null,[Validators.required]),
        'typeCode':new FormControl(null,[Validators.required]),
        'date':new FormControl(null,[Validators.required]),
        'durationHours':new FormControl(null,[Validators.required]),
        'places':new FormControl(null,[Validators.required]),
        'price':new FormControl(null,[Validators.required]),
        'photo':new FormControl(null,[Validators.required])

      }
    )
  }
  get myDest(){return this.myForm.controls['dest']}
  get myTypeCode(){return this.myForm.controls['typeCode']}
  get myDate(){return this.myForm.controls['date']}
  get myDurationHours(){return this.myForm.controls['durationHours']}
  get myPlaces(){return this.myForm.controls['places']}
  get myPrice(){return this.myForm.controls['price']}
  get myPhoto(){return this.myForm.controls['photo']}

  newTrip:trip=new trip();
      send(){
        debugger
        this.newTrip.isFirstAid=true;
        this.newTrip.typeCode=this.myTypeCode.value;
        this.newTrip.tripDate=this.myDate.value;
        this.newTrip.tripDestination=this.myDest.value;
        this.newTrip.tripDurationHours=this.myDurationHours.value;
        this.newTrip.availablePlaces=this.myPlaces.value;
        this.newTrip.photo=this.myPhoto.value;
        this.newTrip.price=this.myPrice.value;
        this.newTrip.typeName="beach";
        console.log(this.newTrip);
        if(this.thisTripCode==-1)
        {
          this.ts.addTrip(this.newTrip)
          .subscribe(succ=>{
            alert('succ');
            console.log(succ);
          },
          err=>{
            alert('err');
            console.log(err);
          })
        }
      }
    }
  

