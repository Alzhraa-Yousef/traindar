import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from '../servises/train.service';
import { Station } from '../shared/station';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-train-city-name',
  templateUrl: './train-city-name.component.html',
  styleUrls: ['./train-city-name.component.scss']
})
export class TrainCityNameComponent implements OnInit {

  //trainIDList=['1001','1002','1003','1004','1005']
  trainIDList:any
  session:string| any;
  StationNameTimeList:Station[]|any;
  errorMessageID:string|undefined;

  //CityNameTimeList=[{name:'Asyut',Time:2},{name:'Sohag',Time:0.5},{name:'Minya',Time:4}]
  selectFlag:boolean|undefined
  x:any

  constructor(private elementRef:ElementRef,private router: Router,private trainInformation:TrainService,) { }

  ngOnInit(): void {
        this.session=localStorage.getItem('UserID');
        if( this.session=='')
          {this.router.navigate(['loginform'])  ;}
  
        else{
                //httpget to get Trainidlist for selectoptions
          this.trainInformation.GetTrainIDList2().subscribe(
            (response) => {this.trainIDList=response},
            (error) =>{console.log(error);
                     this.errorMessageID = error;
                        // Swal.fire({
                        //  title: 'Error',
                        //  html: "Are you sure you want to send the points ?",
                        //  iconHtml: '<img src="../../assets/error.png">',
                        //  background:'#DFD1A2',
                        //  showCancelButton: true,
                        //  confirmButtonColor: '#F6BC00',
                        //  cancelButtonColor: '#F6BC00',
                        //  cancelButtonText:'No',
                        //  confirmButtonText: 'Yes',
                        //  width:400, })
                      },
          // ()=>{}
                    );
              }
  }


  getNearstStation(){
      var selectedIDMenu = this.elementRef.nativeElement.querySelector('#trainIDMenu');
        var selectedID=selectedIDMenu.options[selectedIDMenu.selectedIndex].text;
        console.log(selectedID)
          if(selectedID=="Select train ID"){
            console.log( "no");
            this.selectFlag=true;
          }
        else{
              this.trainInformation.GetCityNameTimeList(selectedID,this.session).subscribe(
                (response) => {
                  this.StationNameTimeList=response;
                  console.log(this.StationNameTimeList);
                console.log(this.StationNameTimeList.length);
              },
                (error) =>{console.log(error);
                  this.errorMessageID = error;
                  // Swal.fire({
                  //  title: 'Error',
                  //  html: this.errorMessageID,//"Are you sure you want to send the points ?"
                  //  iconHtml: '<img src="../../assets/error.png">',
                  //  background:'#DFD1A2',
                  //  showCancelButton: true,
                  //  confirmButtonColor: '#F6BC00',
                  //  cancelButtonColor: '#F6BC00',
                  //  cancelButtonText:'No',
                  //  confirmButtonText: 'Yes',
                  //  width:400, })
                },

                ()=>{
                      this.selectFlag=false;
                      const element = <HTMLInputElement> document.getElementById('row3')
                      element.innerHTML=''
                      if (this.StationNameTimeList.length<1){
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
                    tdtitle1.style.border='1px solid black'
                    tdtitle2.style.border='1px solid black'
                    tdtitle1.style.background='#DFD1A2'
                    tdtitle2.style.background='#DFD1A2'
                    tdtitle1.style.width='150px'
                    tdtitle2.style.width='150px'
                    tdtitle1.style.textAlign='center'
                    tdtitle2.style.textAlign='center'
                    tdtitle1.style.borderTopLeftRadius='30px'
                    tdtitle2.style.borderTopRightRadius='30px'
                    const tdtitleTEXT1=document.createTextNode('Train ID')
                    const tdtitleTEXT2=document.createTextNode('Remaining Time(hr)')
                    tdtitle1.appendChild(tdtitleTEXT1)
                    tdtitle2.appendChild(tdtitleTEXT2)

                    TRtitle.appendChild(tdtitle1)
                    TRtitle.appendChild(tdtitle2)
                    table.appendChild(TRtitle)
                    element.appendChild(table)
                        
                      for(var i=0;i<this.StationNameTimeList.length;i++){
                            const TRi=document.createElement('tr')  
                            const tdName=document.createElement('td')
                            const tdTime=document.createElement('td')
                            const TextName=document.createTextNode(this.StationNameTimeList[i].name.toString())
                            const TextTime=document.createTextNode(this.StationNameTimeList[i].timeLeft.toString())

                            tdName.style.border='1px solid black'
                            tdTime.style.border='1px solid black'
                            tdName.style.background='#DFD1A2'
                            tdTime.style.background='#DFD1A2'
                            tdName.style.width='150px'
                            tdTime.style.width='150px'
                            tdName.style.textAlign='center'
                            tdTime.style.textAlign='center'


                            tdName.appendChild(TextName)
                            tdTime.appendChild(TextTime)
                            TRi.appendChild(tdName)
                            TRi.appendChild(tdTime)
                            table.appendChild(TRi)

                            tdName.style.cursor='pointer'

                                if (i==this.StationNameTimeList.length-1){
                                  var listitems=document.getElementsByTagName('td')
                                      listitems[listitems.length-1].style.borderBottomRightRadius="30px"
                                      listitems[listitems.length-2].style.borderBottomLeftRadius="30px"

                                      }
                                }
                }
                }
              )

    
  }

}
}