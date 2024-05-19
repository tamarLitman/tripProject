import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';     
import { AllTripsComponent } from './project/comps/all-trips/all-trips.component';
import { LoginComponent } from './project/comps/login/login.component';
import { SigninComponent } from './project/comps/signin/signin.component';
import { PersonalAreaComponent } from './project/comps/personal-area/personal-area.component';
import { DetailsComponent } from './project/comps/details/details.component';

const routes: Routes = [

{path:'LogIn', component:LoginComponent},
{path:'SignIn',component:SigninComponent},
{path:'AllTrips', component:AllTripsComponent,},
{path:'PersonalArea',component:PersonalAreaComponent},
{path:'details/:code',component:DetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
