import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderafterComponent } from './headerafter/headerafter.component';
import { HomeafterComponent } from './homeafter/homeafter.component';
import { ContactComponent } from './contact/contact.component';
import { ContactafterComponent } from './contactafter/contactafter.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterafterComponent } from './footerafter/footerafter.component';
import { HttpClientModule } from '@angular/common/http';
import { Formforget1Component } from './formforget1/formforget1.component';
import { Formforget3Component } from './formforget3/formforget3.component';
import { LoginformComponent } from './loginform/loginform.component';
import { SearchtrainIDComponent } from './searchtrain-id/searchtrain-id.component';
import { AgmCoreModule } from '@agm/core';
import * as $ from 'jquery';
import { CitytrainIDComponent } from './citytrain-id/citytrain-id.component';
import { TrainCityNameComponent } from './train-city-name/train-city-name.component';
import { ManagePointsComponent } from './manage-points/manage-points.component';
import { PointshistoryComponent } from './pointshistory/pointshistory.component';

//import { AgmCoreModule } from '@agm/core/lib/core.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FormsComponent,
    NotfoundComponent,
    FooterComponent,
    HeaderafterComponent,
    HomeafterComponent,
    ContactComponent,
    ContactafterComponent,
    ProfileComponent,
    FooterafterComponent,
    Formforget1Component,
    Formforget3Component,
    LoginformComponent,
    SearchtrainIDComponent,
    CitytrainIDComponent,
    TrainCityNameComponent,
    ManagePointsComponent,
    PointshistoryComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBy1TT8oOUraxv2IRV5bx5Zm0Ps8FfXHSM',//YOUR-API-KEY-HERE 
      libraries: ['places'],
    }),
        

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
