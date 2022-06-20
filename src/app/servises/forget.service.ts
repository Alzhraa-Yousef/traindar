import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {
  _urlEmailForgit="https://train-dar.azurewebsites.net/api/v1/reset-password/email?email=";
  _urlCodeForgit="https://train-dar.azurewebsites.net/api/v1/reset-password/email-token?email=";
  _urlPassForget="https://train-dar.azurewebsites.net/api/v1/reset-password/email-password";

  constructor(private _http:HttpClient) { }

  PostEmailForgetInformation(email:any){
    return this._http.get(this._urlEmailForgit+email)
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }


  PostCodeForgetInformation(dataEmail:any,dataCode:any){
    return this._http.get(this._urlCodeForgit+dataEmail+"&token="+dataCode)
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }


  PostPassForgetInformation(dataEmail:any,dataPass:any){
    return this._http.post(this._urlPassForget,{email:dataEmail,password:dataPass})
    .pipe(catchError(err=>{return throwError(err.error.message)}));    
  }



}
