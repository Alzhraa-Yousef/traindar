import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiseService } from '../servises/user-servise.service';
import { Pointshistory, Userregister } from '../shared/userform';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-pointshistory',
  templateUrl: './pointshistory.component.html',
  styleUrls: ['./pointshistory.component.scss']
})
export class PointshistoryComponent implements OnInit {

  constructor(private serviceuser:UserServiseService,private router: Router,private elementRef:ElementRef) { }

  profileInfo:Userregister | any;
  errorMessage:string| any;
  UserID:string| any;
  session:string| any;
  pointshistoryModel:Pointshistory=new Pointshistory("" ,"" ,"" ,"","");
  pointshistoryList:Pointshistory[]|any=[
    {points:50,from:"Traindar",to:"You",date:"1/1/2022",details:"Gift from traindar"},
    {points:20,from:"You",to:"@ali12",date:"25/10/2021",details:"Gift from friend"},
    {points:-5,from:"Traindar",to:"You",date:"20/10/2021",details:"Gift from traindar"},
    {points:10,from:"@ali12",to:"You",date:"15/9/2020",details:"Gift from friend"},
   ];


   
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


        const element = <HTMLInputElement> document.getElementById('row3')
      element.innerHTML=''
                      if (this.pointshistoryList.length<1){
                        Swal.fire({
                          title: 'Error',
                          html: "There is no available stations",
                          iconHtml: '<img src="../../assets/error.png">',
                          //background:'#DFD1A2',
                          confirmButtonColor: '#F6BC00',
                          confirmButtonText: 'OK',
                          width:400, });
              
                      }
                     else{
                    const table=document.createElement('table')
                    table.style.borderCollapse ='separate'
                    table.style.borderSpacing='1px'

                    const TRtitle=document.createElement('tr')  

                    const tdtitle1=document.createElement('td')
                    const tdtitle2=document.createElement('td')
                    const tdtitle3=document.createElement('td')
                    const tdtitle4=document.createElement('td')
                    const tdtitle5=document.createElement('td')

                    tdtitle1.style.border='1px solid black'
                    tdtitle2.style.border='1px solid black'
                    tdtitle3.style.border='1px solid black'
                    tdtitle4.style.border='1px solid black'
                    tdtitle5.style.border='1px solid black'

                    tdtitle1.style.background='#DFD1A2'
                    tdtitle2.style.background='#DFD1A2'
                    tdtitle3.style.background='#DFD1A2'
                    tdtitle4.style.background='#DFD1A2'
                    tdtitle5.style.background='#DFD1A2'

                    tdtitle1.style.width='150px'
                    tdtitle2.style.width='150px'
                    tdtitle3.style.width='150px'
                    tdtitle4.style.width='150px'
                    tdtitle5.style.width='150px'

                    tdtitle1.style.textAlign='center'
                    tdtitle2.style.textAlign='center'
                    tdtitle3.style.textAlign='center'
                    tdtitle4.style.textAlign='center'
                    tdtitle5.style.textAlign='center'

                    tdtitle1.style.borderTopLeftRadius='30px'
                    tdtitle5.style.borderTopRightRadius='30px'

                    const tdtitleTEXT1=document.createTextNode('Points')
                    const tdtitleTEXT2=document.createTextNode('From')
                    const tdtitleTEXT3=document.createTextNode('To')
                    const tdtitleTEXT4=document.createTextNode('Date')
                    const tdtitleTEXT5=document.createTextNode('Details')
                    tdtitle1.appendChild(tdtitleTEXT1)
                    tdtitle2.appendChild(tdtitleTEXT2)
                    tdtitle3.appendChild(tdtitleTEXT3)
                    tdtitle4.appendChild(tdtitleTEXT4)
                    tdtitle5.appendChild(tdtitleTEXT5)

                    TRtitle.appendChild(tdtitle1)
                    TRtitle.appendChild(tdtitle2)
                    TRtitle.appendChild(tdtitle3)
                    TRtitle.appendChild(tdtitle4)
                    TRtitle.appendChild(tdtitle5)
                    table.style.fontSize="20px";
                    table.appendChild(TRtitle)
                    element.appendChild(table)
                        
                      for(var i=0;i<this.pointshistoryList.length;i++){
                            const TRi=document.createElement('tr')  

                            const tdpoints=document.createElement('td')
                            const tdfrom=document.createElement('td')
                            const tdto=document.createElement('td')
                            const tddate=document.createElement('td')
                            const tddetails=document.createElement('td')

                            const Textpoints=document.createTextNode(this.pointshistoryList[i].points.toString())
                            const Textfrom=document.createTextNode(this.pointshistoryList[i].from.toString())
                            const Textto=document.createTextNode(this.pointshistoryList[i].to.toString())
                            const Textdate=document.createTextNode(this.pointshistoryList[i].date.toString())
                            const Textdetails=document.createTextNode(this.pointshistoryList[i].details.toString())


                            tdpoints.style.border='1px solid black'
                            tdpoints.style.background='#DFD1A2'
                            tdpoints.style.width='180px'
                            tdpoints.style.textAlign='center'

                            tdfrom.style.border='1px solid black'
                            tdfrom.style.background='#DFD1A2'
                            tdfrom.style.width='180px'
                            tdfrom.style.textAlign='center'

                            tdto.style.border='1px solid black'
                            tdto.style.background='#DFD1A2'
                            tdto.style.width='180px'
                            tdto.style.textAlign='center'

                            tddate.style.border='1px solid black'
                            tddate.style.background='#DFD1A2'
                            tddate.style.width='180px'
                            tddate.style.textAlign='center'

                            tddetails.style.border='1px solid black'
                            tddetails.style.background='#DFD1A2'
                            tddetails.style.width='480px'
                            tddetails.style.textAlign='center'


                            tdpoints.appendChild(Textpoints)
                            tdfrom.appendChild(Textfrom)
                            tdto.appendChild(Textto)
                            tddate.appendChild(Textdate)
                            tddetails.appendChild(Textdetails)

                            TRi.appendChild(tdpoints)
                            TRi.appendChild(tdfrom)
                            TRi.appendChild(tdto)
                            TRi.appendChild(tddate)
                            TRi.appendChild(tddetails)

                            table.appendChild(TRi)
                                if (i==this.pointshistoryList.length-1){
                                  var listitems=document.getElementsByTagName('td')
                                      listitems[listitems.length-1].style.borderBottomRightRadius="30px"
                                      listitems[listitems.length-5].style.borderBottomLeftRadius="30px"

                                      }
                                }
                }
                
    }
}


}
