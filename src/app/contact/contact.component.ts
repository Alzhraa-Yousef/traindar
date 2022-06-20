import { Component, OnInit } from '@angular/core';
import {Userregister,Userlogin, AddetionalInformation} from '../shared/userform'


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  userModel:Userregister=new Userregister('','','','',0);
  userModel2:Userlogin=new Userlogin('','');
  userModel3:AddetionalInformation=new AddetionalInformation('','','','','');

  flagsend:boolean | undefined=false;
  hasTopicError: boolean | undefined;



  constructor() { }

  ngOnInit(): void {
  }

  checkBeforeSend(event: MouseEvent){
    if(this.userModel.name==''||this.userModel.email==''||this.userModel3.message==''||this.hasTopicError==false) {
      event.preventDefault();
      this.flagsend=true;
    }
    else{this.flagsend=false;}
  }

}
