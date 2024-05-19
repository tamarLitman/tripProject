import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllTripsComponent } from './project/comps/all-trips/all-trips.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './project/comps/login/login.component';
import { TripFormComponent } from './project/comps/trip-form/trip-form.component';
import { NavComponent } from './project/comps/nav/nav.component';
import { SigninComponent } from './project/comps/signin/signin.component';
import { HighlightDirective } from './highlight.directive';
import { PersonalAreaComponent } from './project/comps/personal-area/personal-area.component';
import { DetailsComponent } from './project/comps/details/details.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HighlightDirective,
    PersonalAreaComponent,
    // AllTripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AllTripsComponent,
    LoginComponent,
    TripFormComponent,
    SigninComponent,
    DetailsComponent,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
