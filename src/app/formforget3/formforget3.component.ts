import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetService } from '../servises/forget.service';
import { AddetionalInformation, Userregister } from '../shared/userform';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-formforget3',
  templateUrl: './formforget3.component.html',
  styleUrls: ['./formforget3.component.scss']
})
export class Formforget3Component implements OnInit {
  flagCodeSection:boolean|undefined;
  flagPassSection:boolean|undefined;

  flagForgitcodeIncomplete:boolean | undefined;
  flagForgitPassIncomplete: boolean | undefined;

  userModel3:AddetionalInformation=new AddetionalInformation('','','','','');
  hasTopicError: boolean | undefined;
 
  errorMessageF3:string | undefined;
  userModel:Userregister=new Userregister('','','','',0);
  //usertestmodel:setpassword=new setpassword('','');
  
  dontmatch: boolean | undefined;
  errorMessageF2:string|undefined;
  text:string|any;


  
  constructor(private forget:ForgetService,private router: Router) { }

  ngOnInit(): void {
    this.flagCodeSection=true;
  }

  checkForgitCode(event: MouseEvent){
    if(this.userModel3.code=='' || this.hasTopicError==false){
    event.preventDefault();
    this.flagForgitcodeIncomplete=true;
    //this.flagForgitPass=false;
  }
    else{
      this.flagForgitcodeIncomplete=false;
      this.forget.PostCodeForgetInformation(localStorage.getItem('forgetEmail'),this.userModel3.code).subscribe(
        (response) => {console.log(response)},
        (error) =>{console.log(error);
          this.errorMessageF3 = error;
          console.log(this.errorMessageF3);
          if(typeof this.errorMessageF3 == 'undefined' ) {
            this.flagPassSection=true;
            this.flagCodeSection =false; 
           
               } 
                   
              },
                  );
    
    
    }
  }



  checkpassANDconfirm(event: MouseEvent){
    if(this.userModel.password=='' ||this.userModel3.confirmpass=='' || this.hasTopicError==false) {
      event.preventDefault();
     this.flagForgitPassIncomplete=true;
     this.dontmatch=false;
    }
    else{
      this.flagForgitPassIncomplete=false;
          if(this.userModel.password==this.userModel3.confirmpass){
          this.flagForgitPassIncomplete=false;
          this.dontmatch=false;
         //this.text= localStorage.getItem('forgetEmail');
          //this.usertestmodel.email=JSON.parse(this.text);
          //this.usertestmodel.password=this.userModel.password;
          this.forget.PostPassForgetInformation(localStorage.getItem('forgetEmail'),this.userModel.password).subscribe(
            (response) => {console.log(response)},
            (error) =>{console.log(error);
                      this.errorMessageF2 = error;
                        console.log(error);
                        if (typeof this.errorMessageF2 == 'undefined' ) {
                          Swal.fire({
                            icon:"success",
                            title: 'Success',
                            html: "<p>Successfully registered , Please log in</p>",
                            confirmButtonColor: '#F6BC00',
                            confirmButtonText: 'OK'
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    this.router.navigate(['loginform']);
                                  }
                                }) ;
                        }
                        },
                        // ()=>{alert('Password changed successfully , Please log in');
                        // this.router.navigate(['loginform']);}
                        );
                                  }
         else{this.dontmatch=true; this.flagForgitPassIncomplete=false;}
  }
}


}
