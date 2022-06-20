import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private _http:HttpClient) { }

  // Search service
  _urlTrianID="https://train-dar.azurewebsites.net/api/v1/train/view-all";
  _urlTrianLocation="https://train-dar.azurewebsites.net/api/v1/train/view?user-id=";

  
  GetTrainIDList(){
    return this._http.get(this._urlTrianID)
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }

  GetTrainLocation(trainID:any,UserID:any){
    return this._http.get(this._urlTrianLocation+UserID+"&train-id="+trainID)
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }



  // Check upcoming trains service
  //http://localhost:8080/api/v1/train/show-upcoming-trains?user-id=1&first-city=Omar Makram gate&second-city=Building C

  _urlCityNamesList="https://train-dar.azurewebsites.net/api/v1/station/all";
  _urlCityNamesSelected="https://train-dar.azurewebsites.net/api/v1/train/show-upcoming-trains?user-id=";

  GetCityNamesList(){
    return this._http.get(this._urlCityNamesList)
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }

  GetTrianIDTimeList(city1:any,city2:any,UserID:any){
    console.log(this._urlCityNamesSelected +UserID + "&first-city=" + city1 + "&second-city=" + city2);
    return this._http.get(this._urlCityNamesSelected +UserID + "&first-city=" + city1 + "&second-city=" + city2)
    .pipe(catchError(err=>{return throwError(err.error.message)}));
  }
  
  GetTrianLocation2(trainID:any){
    return this._http.get(this._urlTrianLocation+trainID)
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }

 


  // nearst stations service
// بستخدم من اول خدمة حجات مشتركة


_urlTrainIDSelected="https://train-dar.azurewebsites.net/api/v1/station/nearest-stations?user-id=";

GetCityNameTimeList(trainID:any,UserID:any){
  return this._http.get(this._urlTrainIDSelected +UserID + "&train-id="+ trainID)
  .pipe(catchError(err=>{return throwError(err.error.message)}));    
}
  

}
