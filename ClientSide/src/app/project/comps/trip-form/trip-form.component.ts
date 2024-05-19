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
                public t:TripService) {}

  myForm:FormGroup=new FormGroup({})

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  ngOnInit(): void {
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
      //יצירת טיול חדש והוספתו לטיולים
      this.newTrip.tripDestination=this.myDest.value,
      this.newTrip.typeCode=this.myTypeCode.value,
      this.newTrip.tripDate=this.myDate.value,
      this.newTrip.tripDurationHours=this.myDurationHours.value,
      this.newTrip.price=this.myPrice.value,
      this.newTrip.photo=this.myPhoto.value,
      this.newTrip.availablePlaces=this.myPlaces.value
     
      this.newTrip.typeName="Beach"
      this.newTrip.isFirstAid=true
      this.t.addTrip(this.newTrip).subscribe(
        succ=>{
          console.log("=====")
          console.log(this.newTrip)
          console.log(this.newTrip.typeName)
          console.log(succ)
          console.log("addtrip")
          console.log("=====")
        },
        err=>{
          alert('not found!!')
        }
      )
      }
 
    }
  

