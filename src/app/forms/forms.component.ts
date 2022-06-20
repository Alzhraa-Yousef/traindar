import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharingServiceService } from '../servises/sharing-service.service';
import { UserServiseService } from '../servises/user-servise.service';
import {Userregister,Userlogin, AddetionalInformation} from '../shared/userform';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  
  //@ViewChild('txtcode') input: any; 
  userModel:Userregister=new Userregister('','','','',0);
  flagRegister:boolean | undefined=false;
  errorMessageReg:string|undefined;
  hasTopicError: boolean | undefined;



  constructor(private serviceuser:UserServiseService,private router: Router ,private sharingService: SharingServiceService) { }

  ngOnInit(): void {
    
    
  }

  // validateApp(ddlValue: string)
  // {
  //   if(ddlValue==="default")
  //   {
  //     this.hasTopicError=true;

  //   }
  //   else{
  //     this.hasTopicError=false;
  //   }

  // }


  haveaccount(){
    this.router.navigate(['loginform']);
  }
  
  
  
  checkBeforeSine(event: MouseEvent){
    if(this.userModel.name==''||this.userModel.password==''||this.userModel.email==''||this.userModel.phone==''|| this.hasTopicError==false) {
      event.preventDefault();
      this.flagRegister=true;
    }
    else{ this.flagRegister=false;
          this.serviceuser.PostUsrInformation(this.userModel).subscribe(
          (response) => {console.log(response)},
          (error) =>{ 
                  this.errorMessageReg = error;
                  console.log(error);
                  if (typeof this.errorMessageReg == 'undefined' ) {
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

                    // alert('Successfully registered , Please log in');
                    // this.router.navigate(['loginform']);
                        
                         // localStorage.setItem('profileEmail',this.userModel.email);  
                  }      
                    },
                    //()=>{ } 
                                                                        );
      }
      // this.sharingService.save(this.userModel.email)
}




}
