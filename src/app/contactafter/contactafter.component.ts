import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddetionalInformation, Userlogin, Userregister } from '../shared/userform';

@Component({
  selector: 'app-contactafter',
  templateUrl: './contactafter.component.html',
  styleUrls: ['./contactafter.component.scss']
})
export class ContactafterComponent implements OnInit {
  userModel:Userregister=new Userregister('','','','',0);
  userModel2:Userlogin=new Userlogin('','');
  userModel3:AddetionalInformation=new AddetionalInformation('','','','','');

  flagsend:boolean | undefined=false;
  hasTopicError: boolean | undefined;
  session:string| any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.session=localStorage.getItem('UserID');
    if( this.session=='')
       {this.router.navigate(['loginform'])  ;}
  }

  checkBeforeSend(event: MouseEvent){
    if(this.userModel.name==''||this.userModel.email==''||this.userModel3.message==''||this.hasTopicError==false) {
      event.preventDefault();
      this.flagsend=true;
    }
    else{this.flagsend=false;}
  }

}
