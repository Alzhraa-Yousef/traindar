import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiseService } from '../servises/user-servise.service';
import { Userregister } from '../shared/userform';

@Component({
  selector: 'app-headerafter',
  templateUrl: './headerafter.component.html',
  styleUrls: ['./headerafter.component.scss']
})
export class HeaderafterComponent implements OnInit {

  constructor(private serviceuser:UserServiseService,private router: Router){}
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

  clearLoginInformation(){
  localStorage.setItem('UserID','');
  }

}
