import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiseService } from '../servises/user-servise.service';
import { Userregister } from '../shared/userform';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(private serviceuser:UserServiseService,private router: Router) { }
  profileInfo:Userregister | any;
  errorMessage1:string| any;
  errorMessage2:string| any;
  UserID:string| any;
  session:string| any;
  userModel:Userregister|any;
  hasTopicError: boolean | undefined;
  flagLogin:boolean| undefined;


  ngOnInit(): void {
      this.session=localStorage.getItem('UserID');
      if( this.session=='')
         {this.router.navigate(['loginform'])  ;}
      else{
        const all = document.querySelectorAll("small");
        for(var i =0;i<all.length;i++)
        {all[i].style.display="none";}

          this.UserID=localStorage.getItem('UserID');
          console.log(this.UserID);
          this.serviceuser.GetUsrInformation(this.UserID).subscribe(
          userdata=>{ 
            this.profileInfo=userdata;  
            this.userModel=userdata;
            localStorage.setItem("Username" ,this.profileInfo) ;
        for(var i =0;i<all.length;i++){all[i].style.display="block"}
         },
          errorMsg=>{this.errorMessage1=errorMsg;}
        );
    }
}


goEditProfile(){
  this.router.navigate(['editprofile']) ;
}

goPointHistory(){
  this.router.navigate(['pointshistory'])  ;
}




Save(event: MouseEvent) {
  if (this.userModel.name == '' || this.userModel.email  == '' || this.userModel.phone  == ''  || this.hasTopicError == false) {
    event.preventDefault();
    this.flagLogin = true;
  }

  else {
    this.flagLogin = false;
    // this.serviceuser.PostLoginrInformation(this.userModel).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.session = response;
    //     localStorage.setItem('UserID', this.session);
    //     this.router.navigate(['homeafter']);
    //   },
    //   (error) => {
    //     this.errorMessage2 = error;
    //     console.log(error);
    //   },
    // );
    Swal.fire({
      title: 'Enter your password',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'OK',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}`,
        })
      }
    })
  }
}



}
