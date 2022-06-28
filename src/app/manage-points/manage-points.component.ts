import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { Points } from '../shared/userform';
@Component({
  selector: 'app-manage-points',
  templateUrl: './manage-points.component.html',
  styleUrls: ['./manage-points.component.scss']
})
export class ManagePointsComponent implements OnInit {
  manageFlag:boolean|undefined=true
  sendFlag:boolean|undefined
  buyFlag:boolean|undefined
  messageFlag1:boolean|undefined
  messageFlag2:boolean|undefined
  name:string=''
  pointModel: Points = new Points('', '','', '');
  pointnumber:any|undefined=''
  hasTopicError: boolean | undefined;


  constructor(private router: Router ) { }

  ngOnInit(): void {

  }

  redirect(){
    this.router.navigate(['pointshistory']);
  }

  sendPoints1(){
    this.manageFlag=false
    this.messageFlag1=false
    this.messageFlag2=false
    this.buyFlag=false
    this.sendFlag=true
  }

  sendPoints2(){
    if(this.name==''||this.pointnumber==''|| this.hasTopicError==false) {
      this.messageFlag1=true;
      
    }
    else{
      this.messageFlag1=false;
    
    Swal.fire({
      title: 'Confirm',
      html: "Are you sure you want to send the points ?",
      iconHtml: '<img src="../../assets/question-mark.png">',
      background:'#DFD1A2',
      showCancelButton: true,
      confirmButtonColor: '#F6BC00',
      cancelButtonColor: '#F6BC00',
      cancelButtonText:'No',
      confirmButtonText: 'Yes',
      width:400,
      }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Thank You',
                html: "The points has been successfully sent.",
                iconHtml: '<img src="../../assets/tick.png">',
                background:'#DFD1A2',
                confirmButtonColor: '#F6BC00',
                confirmButtonText: 'OK',
                width:400,
                })
            }
          }) ;
        }
  }

  
  buyPoints1(){
    this.manageFlag=false
    this.messageFlag1=false
    this.messageFlag2=false
    this.sendFlag=false
    this.buyFlag=true
    

  }

  buyPoints2(){
    if(this.pointModel.pointnumber==''||this.pointModel.cardnumber==''||this.pointModel.expirydate==''||this.pointModel.securitycode==''|| this.hasTopicError==false) {
      this.messageFlag2=true;
    }
    else{
      this.messageFlag2=false;
    Swal.fire({
      title: 'Confirm',
      html: "Are you sure ?",
      iconHtml: '<img src="../../assets/question-mark.png">',
      background:'#DFD1A2',
      showCancelButton: true,
      confirmButtonColor: '#F6BC00',
      cancelButtonColor: '#F6BC00',
      cancelButtonText:'No',
      confirmButtonText: 'Yes',
      width:400,
      }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Done',
                html: "The points has been successfully add to you.",
                iconHtml: '<img src="../../assets/tick.png">',
                background:'#DFD1A2',
                confirmButtonColor: '#F6BC00',
                confirmButtonText: 'OK',
                width:400,
                })
            }
          }) ;
    
  }
}


cancel(){
  this.manageFlag=true
  this.buyFlag=false
    this.sendFlag=false
}
  




}
