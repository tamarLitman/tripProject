import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';     
import { AllTripsComponent } from './project/comps/all-trips/all-trips.component';
import { LoginComponent } from './project/comps/login/login.component';
import { SigninComponent } from './project/comps/signin/signin.component';
import { PersonalAreaComponent } from './project/comps/personal-area/personal-area.component';
import { DetailsComponent } from './project/comps/details/details.component';
import { AllUsersComponent } from './project/comps/all-users/all-users.component';
import { TripFormComponent } from './project/comps/trip-form/trip-form.component';
import { AllBookingPlaceComponent } from './project/comps/all-booking-place/all-booking-place.component';
import { HomeComponent } from './project/comps/home/home.component';
// import { TripFormComponent } from './project/comps/trip-form/trip-form.component';

const routes: Routes = [

{path:'LogIn', component:LoginComponent},
{path:'Home', component:HomeComponent},
{path:'', component:HomeComponent},
{path:'SignIn/:status',component:SigninComponent},
{path:'tripForm/:code',component:TripFormComponent},
{path:'AllTrips', component:AllTripsComponent,},
{path:'PersonalArea',component:PersonalAreaComponent},
{path:'details/:code',component:DetailsComponent},
{path:'Users',component:AllUsersComponent},
{path:'orders/:code',component:AllBookingPlaceComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
