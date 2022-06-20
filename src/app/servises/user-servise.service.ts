import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Userregister } from '../shared/userform';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';



@Injectable({
  providedIn: 'root'
})
export class UserServiseService {

  //_url1="https://jsonplaceholder.typicode.com/users"; 
  _urlRegister="https://train-dar.azurewebsites.net/api/v1/registration";
  _urlLogin="https://train-dar.azurewebsites.net/api/v1/sign-in";
  _urlprofile="https://train-dar.azurewebsites.net/api/v1/user/";

  constructor(private _http:HttpClient) { }

  // GetUsrInformation():Observable<Userregister[]>{
  //   return this._http.get<Userregister[]>(this._url1)
  //   .pipe(catchError(err=>{return throwError(err.msg)}));
    
  // }

  PostUsrInformation(data:any){
    return this._http.post(this._urlRegister,data)
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }


  PostLoginrInformation(data:any){
    return this._http.post(this._urlLogin,data)
    .pipe(catchError(err=>{return throwError(err.error.message)}
    ));
    //'Email or password is incorrect'
  }



   GetUsrInformation(id:any):Observable<Userregister>{
    return this._http.get<Userregister>(this._urlprofile+id)
    .pipe(catchError(err=>{return throwError(err.error.message)}));
    
  }

}
