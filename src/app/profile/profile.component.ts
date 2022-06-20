import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingServiceService } from '../servises/sharing-service.service';
import { UserServiseService } from '../servises/user-servise.service';
import { Userregister } from '../shared/userform';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private serviceuser:UserServiseService,private router: Router,private sharingService: SharingServiceService) { }

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
          userdata=>{ this.profileInfo=userdata; },
          errorMsg=>{this.errorMessage=errorMsg;console.log(this.errorMessage);}
        );
    }
}


}
