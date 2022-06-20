import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
@Component({
  selector: 'app-manage-points',
  templateUrl: './manage-points.component.html',
  styleUrls: ['./manage-points.component.scss']
})
export class ManagePointsComponent implements OnInit {
  manageFlag:boolean|undefined=true
  sendFlag:boolean|undefined
  buyFlag:boolean|undefined
  messageFlag:boolean|undefined
  name:string=''
  pointnumber:any|undefined=''
  cardnumber:any|undefined=''
  expirydate:any|undefined=''
  securitycode:any|undefined=''
  hasTopicError: boolean | undefined;


  constructor() { }

  ngOnInit(): void {

  }

  sendPoints1(){
    this.manageFlag=false
    this.buyFlag=false
    this.sendFlag=true
  }

  sendPoints2(){
    if(this.name==''||this.pointnumber==''|| this.hasTopicError==false) {
      this.messageFlag=true;
    }
    else{
      this.messageFlag=false;
    
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
    this.sendFlag=false
    this.buyFlag=true
    

  }

  buyPoints2(){
    if(this.pointnumber==''||this.cardnumber==''||this.expirydate==''||this.securitycode==''|| this.hasTopicError==false) {
      this.messageFlag=true;
    }
    else{
      this.messageFlag=false;
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
