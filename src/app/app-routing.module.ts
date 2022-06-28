import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitytrainIDComponent } from './citytrain-id/citytrain-id.component';
import { ContactComponent } from './contact/contact.component';
import { ContactafterComponent } from './contactafter/contactafter.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { Formforget1Component } from './formforget1/formforget1.component';
import { Formforget3Component } from './formforget3/formforget3.component';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { HomeafterComponent } from './homeafter/homeafter.component';
import { LoginformComponent } from './loginform/loginform.component';
import { ManagePointsComponent } from './manage-points/manage-points.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PointshistoryComponent } from './pointshistory/pointshistory.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchtrainIDComponent } from './searchtrain-id/searchtrain-id.component';
import { SharingServiceService } from './servises/sharing-service.service';
import { TrainCityNameComponent } from './train-city-name/train-city-name.component';

const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'homeafter', component: HomeafterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactafter', component: ContactafterComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'editprofile',component:EditprofileComponent},
  {path:'signinform',component:FormsComponent},
  {path:'loginform',component:LoginformComponent},
  {path:'formforget1',component:Formforget1Component},
  {path:'formforget3',component:Formforget3Component},
  {path:'TrainID',component:SearchtrainIDComponent},
  {path:'CityTrainID',component:CitytrainIDComponent},
  {path:'CityTrainName',component:TrainCityNameComponent},
  {path:'points',component:ManagePointsComponent},
  {path:'pointshistory',component:PointshistoryComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[SharingServiceService]
})
export class AppRoutingModule { }
