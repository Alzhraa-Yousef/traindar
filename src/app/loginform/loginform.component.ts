import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharingServiceService } from '../servises/sharing-service.service';
import { UserServiseService } from '../servises/user-servise.service';
import { Userlogin } from '../shared/userform';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {

  userModel2: Userlogin = new Userlogin('', '');
  errorMessageLog: string | undefined;
  flagLogin: boolean | undefined = false;
  hasTopicError: boolean | undefined;
  session: string | any;

  constructor(private serviceuser: UserServiseService, private router: Router, private sharingService: SharingServiceService) { }

  ngOnInit(): void {
  }

  forgitpass() {
    this.router.navigate(['formforget1']);
  }

  registerform() {
    this.router.navigate(['signinform']);
  }


  checkBeforeLogin(event: MouseEvent) {
    if (this.userModel2.email == '' || this.userModel2.password == '' || this.hasTopicError == false) {
      event.preventDefault();
      this.flagLogin = true;
    }

    else {
      this.flagLogin = false;
      this.serviceuser.PostLoginrInformation(this.userModel2).subscribe(
        (response) => {
          console.log(response);
          this.session = response;
          localStorage.setItem('UserID', this.session);
          this.router.navigate(['homeafter']);
        },
        (error) => {
          this.errorMessageLog = error;
          console.log(error);
          // if (typeof this.errorMessageLog == 'undefined') {
          //    localStorage.setItem('UserID', this.session);
          // this.router.navigate(['homeafter']);
          //   // localStorage.setItem('profileEmail',this.userModel.email);  
          // }
        },
        // () => {
        //   localStorage.setItem('UserID', this.session);
        //   this.router.navigate(['homeafter']);
        // }
      );
    }

    // else{
    //      this.serviceuser.PostLoginrInformation(this.userModel2).subscribe(
    //     (response) => {console.log(response)},
    //     (error) => { 
    //          this.errorMessageLog = error;
    //           //console.log(error);
    //           if(typeof this.errorMessageLog == 'undefined' ) {
    //                   this.router.navigate(['homeafter'])  ;
    //                   localStorage.setItem('profileEmail',this.userModel2.email);     } 
    //                 },
    //                                                          );
    //        //this.sharingService.save(this.userModel2.email) 

    //     }
  }




}
