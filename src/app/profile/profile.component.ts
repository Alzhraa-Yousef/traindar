import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiseService } from '../servises/user-servise.service';
import { Userregister } from '../shared/userform';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private serviceuser:UserServiseService,private router: Router) { }

  profileInfo:Userregister | any;
  errorMessage:string| any;
  UserID:string| any;
  session:string| any;

  ngOnInit(): void {
      this.session=localStorage.getItem('UserID');
      if( this.session=='')
         {this.router.navigate(['loginform'])  ;}
      else{
          this.UserID=localStorage.getItem('UserID');
          console.log(this.UserID);
          this.serviceuser.GetUsrInformation(this.UserID).subscribe(
          userdata=>{ this.profileInfo=userdata;  localStorage.setItem("Username" ,this.profileInfo)  },
          errorMsg=>{this.errorMessage=errorMsg;console.log(this.errorMessage);}
        );
    }
}

goEditProfile(){
  this.router.navigate(['editprofile']) ;
}

goPointHistory(){
  this.router.navigate(['pointshistory'])  ;
}


invite(){

  // Swal.fire({
  //   //'Good job!',
  //   //'You clicked the button!',
  //   //'success'
  //     title: '<strong>HTML <u>example</u></strong>',
  //     icon: 'info',
  //     html:
  //       '<a href="//sweetalert2.github.io">links</a> ' +
  //       '<a href="">Why do I have this issue?</a>',
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     confirmButtonText:
  //       '<i class="fa fa-thumbs-up"></i> Great!',
  //     confirmButtonAriaLabel: 'Thumbs up, great!',
  //     cancelButtonText:
  //       '<i class="fa fa-thumbs-down"></i>',
  //     cancelButtonAriaLabel: 'Thumbs down'
    
  // })
  // Swal.fire({
  //   //'Good job!',
  //   //'You clicked the button!',
  //   //'success'
  //     title: 'Good job!',
  //     html: "To activate the feature, Download this "+
  //     '<a href="https://www.google.com/">App</a> ' ,
  //     iconHtml: '<img src="../../assets/icons8-download-48.png" >',
  //     //background:'#DFD1A2',
  //     confirmButtonColor: '#F6BC00',
  //     confirmButtonText: 'OK'
  //         // }).then((result) => {
  //         //   if (result.isConfirmed) {
  //         //     Swal.fire(
  //         //       'Deleted!',
  //         //       'Your file has been deleted.',
  //         //       'success'
  //         //     )
  //         //   }
  //         }) ;copy.png
}



}
