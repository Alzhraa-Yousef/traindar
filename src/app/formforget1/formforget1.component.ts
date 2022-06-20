import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetService } from '../servises/forget.service';
import { AddetionalInformation } from '../shared/userform';

@Component({
  selector: 'app-formforget1',
  templateUrl: './formforget1.component.html',
  styleUrls: ['./formforget1.component.scss']
})
export class Formforget1Component implements OnInit {
  flagForgitEmailIncomplete:boolean | undefined;
  userModel3:AddetionalInformation=new AddetionalInformation('','','','','');
  hasTopicError: boolean | undefined;
  errorMessageF1:string|undefined;


  constructor(private forget:ForgetService,private router: Router) { }

  ngOnInit(): void {
  }

  returnLogin(){
    this.router.navigate(['loginform']);

  }

  checkForgitEmail(event: MouseEvent){
    if(this.userModel3.email=='' || this.hasTopicError==false){
    event.preventDefault();
    this.flagForgitEmailIncomplete=true;
  }
    else{ this.flagForgitEmailIncomplete=false;
      this.forget.PostEmailForgetInformation(this.userModel3.email).subscribe(
      (response) => {console.log(response)},
      (error) =>{console.log(error);
        this.errorMessageF1 = error;
                  console.log(error);
                  if(typeof this.errorMessageF1 == 'undefined' ) {
                    localStorage.setItem('forgetEmail',this.userModel3.email);
                    this.router.navigate(['formforget3']);
                       } 
                },
                // ()=>{ 
                //   localStorage.setItem('forgetEmail',this.userModel3.email);
                //   this.router.navigate(['formforget3']); }
                );
              // this.router.navigate(['homeafter'])
    
        }
  }

}
