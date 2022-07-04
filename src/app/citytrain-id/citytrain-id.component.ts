import { Component, ElementRef, OnInit } from '@angular/core';
import { event } from 'jquery';
import { TrainService } from '../servises/train.service';
import { Train ,Location} from '../shared/train';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { Station } from '../shared/station';
import { Router } from '@angular/router';

declare var google: any;
//declare var $:JQueryStatic;
@Component({
  selector: 'app-citytrain-id',
  templateUrl: './citytrain-id.component.html',
  styleUrls: ['./citytrain-id.component.scss']
})
export class CitytrainIDComponent implements OnInit {
  //StationList:string[]| any;
  StationList:string[]| any;
  TrainIDTimeList:Train[]|any;
  Length:any;

  CityList:string[]| any=['10 Ramadan','23 Yuliu','Alexandria','Asyut'] 
  //TrainIDTimeList2=[{ID:110,Time:2},{ID:120,Time:0.5},{ID:130,Time:4},{ID:140,Time:8}]
  // TrainIDTimeList:Train[]| any=[
  //   new Train(110,'2'),
  //   new Train(120,'0.5'),
  //   new Train(130,'1'),
  //   new Train(140,'4'),
  //   new Train(150,'8')
  // ]
  trainLocation:Location|any=new Location(27.180134,31.189283);
  selectFlag:boolean|undefined
  x:any // تظبيط الهوفر
  errorMessageID:string|any
  session:string|any;
  constructor(private elementRef:ElementRef,private router: Router,private trainInformation:TrainService,) { }

  ngOnInit(): void {
    this.session=localStorage.getItem('UserID');
    if( this.session=='')
       {this.router.navigate(['loginform'])  ;} 
   
    this.trainInformation.GetCityNamesList().subscribe(
      (response) => {this.StationList=response},
      (error) =>{console.log(error);
        //this.errorMessageID = error;
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

  GetTraininformation(){
    var selectedNameMenu = this.elementRef.nativeElement.querySelector('#CityNameMenu');
    var selectedName=selectedNameMenu.options[selectedNameMenu.selectedIndex].text;
    var selectedName2Menu = this.elementRef.nativeElement.querySelector('#CityName2Menu');
    var selectedName2=selectedName2Menu.options[selectedName2Menu.selectedIndex].text;
    if(selectedName=="Your City:"|| selectedName2=="Your Destination:"){
      console.log( "no");
      this.selectFlag=true; 
    }
    else{
    this.trainInformation.GetTrianIDTimeList(selectedName,selectedName2,this.session).subscribe(
      (response) => {
        this.TrainIDTimeList=response;
        console.log(this.TrainIDTimeList);
      console.log(this.TrainIDTimeList.length);
      this.Length=this.TrainIDTimeList.length;
      console.log(this.Length)
    },
      (error) =>{console.log(error);
        this.errorMessageID = error;
        Swal.fire({
         title: 'Error',
         html: this.errorMessageID,
         iconHtml: '<img src="../../assets/error.png">',
         background:'#DFD1A2',
         showCancelButton: true,
         confirmButtonColor: '#F6BC00',
         cancelButtonColor: '#F6BC00',
         cancelButtonText:'No',
         confirmButtonText: 'Yes',
         width:400, });
         this.router.navigate(['homeafter']) 
         ;

      },
      ()=>{
        this.selectFlag=false;
        const element = <HTMLInputElement> document.getElementById('row3')
        element.innerHTML=''
        const e2 = <HTMLInputElement> document.getElementById('row4')
        e2.innerHTML=''
        const e3 = <HTMLInputElement> document.getElementById('map')
        e3.innerHTML=''
      
        if (this.TrainIDTimeList.length<1){
          Swal.fire({
            title: 'Error',
            html: "There is no available Trains for selected cities",
            iconHtml: '<img src="../../assets/error.png">',
           // background:'#DFD1A2',
            //showCancelButton: true,
            confirmButtonColor: '#F6BC00',
            cancelButtonColor: '#F6BC00',
            //cancelButtonText:'No',
            confirmButtonText: 'OK',
            width:400, });

        }
       else{
          const table=document.createElement('table')
          table.style.borderCollapse ='separate'
          table.style.borderSpacing='6px'
    
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
          
          for( var i=0;i<this.TrainIDTimeList.length;i++){
                const TRi=document.createElement('tr')  
                const tdID=document.createElement('td')
                const tdTime=document.createElement('td')
                const TextID=document.createTextNode(this.TrainIDTimeList[i].trainId)
                console.log(this.TrainIDTimeList[i].trainId)
                const TextTime=document.createTextNode(this.TrainIDTimeList[i].timeLeft)
    
                tdID.style.border='1px solid black'
                tdTime.style.border='1px solid black'
                tdID.style.background='#DFD1A2'
                tdTime.style.background='#DFD1A2'
                tdID.style.width='150px'
                tdTime.style.width='150px'
                tdID.style.textAlign='center'
                tdTime.style.textAlign='center'
    
    
                tdID.appendChild(TextID)
                tdTime.appendChild(TextTime)
                TRi.appendChild(tdID)
                TRi.appendChild(tdTime)
                table.appendChild(TRi)
    
                tdID.style.cursor='pointer'
    
                if (i==this.Length-1){
                  var listitems=document.getElementsByTagName('td')
                      listitems[listitems.length-1].style.borderBottomRightRadius="30px"
                      listitems[listitems.length-2].style.borderBottomLeftRadius="30px"
    
                  const element2=<HTMLInputElement>document.getElementById('row4')
                  element2.innerHTML=''
                  const B2=document.createElement('button')
                  B2.setAttribute('class','btn')
                  B2.style.background='#eaca60'
                  B2.style.borderRadius='25px'
                  B2.style.width='150px'
                  B2.textContent='Selected Train Location'
                  B2.style.marginTop='15px'
                  B2.setAttribute('id','b2')
                  B2.disabled=true
                  element2.appendChild(B2)
    
    
                }
    
                  tdID.addEventListener('mouseover',(event)=>{
                    this.hoverin(event)
                  })
    
                  tdID.addEventListener('mouseout',(event)=>{
                    this.hoverout(event)
                  })
    
                tdID.addEventListener('click',(event)=>{
                  this.ablebutton(event,Number(tdID.textContent))
                })
              
              }
          }
      }
    )

    // this.selectFlag=false;
    // const element = <HTMLInputElement> document.getElementById('row3')
    // element.innerHTML=''
    // const e2 = <HTMLInputElement> document.getElementById('row4')
    // e2.innerHTML=''
    // const e3 = <HTMLInputElement> document.getElementById('map')
    // e3.innerHTML=''
  
   
    //   const table=document.createElement('table')
    //   table.style.borderCollapse ='separate'
    //   table.style.borderSpacing='6px'

    //   const TRtitle=document.createElement('tr')  

    //   const tdtitle1=document.createElement('td')
    //   const tdtitle2=document.createElement('td')
    //   tdtitle1.style.border='1px solid black'
    //   tdtitle2.style.border='1px solid black'
    //   tdtitle1.style.background='#DFD1A2'
    //   tdtitle2.style.background='#DFD1A2'
    //   tdtitle1.style.width='150px'
    //   tdtitle2.style.width='150px'
    //   tdtitle1.style.textAlign='center'
    //   tdtitle2.style.textAlign='center'
    //   tdtitle1.style.borderTopLeftRadius='30px'
    //   tdtitle2.style.borderTopRightRadius='30px'
    //   const tdtitleTEXT1=document.createTextNode('Train ID')
    //   const tdtitleTEXT2=document.createTextNode('Remaining Time(hr)')
    //   tdtitle1.appendChild(tdtitleTEXT1)
    //   tdtitle2.appendChild(tdtitleTEXT2)

    //   TRtitle.appendChild(tdtitle1)
    //   TRtitle.appendChild(tdtitle2)
    //   table.appendChild(TRtitle)
    //   element.appendChild(table)
      
    //   console.log(this.Length);
    //   for( var i=0;i<this.Length;i++){
    //         const TRi=document.createElement('tr')  
    //         const tdID=document.createElement('td')
    //         const tdTime=document.createElement('td')
    //         const TextID=document.createTextNode(this.TrainIDTimeList[i].trainId)
    //         console.log(this.TrainIDTimeList[i].trainId)
    //         const TextTime=document.createTextNode(this.TrainIDTimeList[i].timeLeft)

    //         tdID.style.border='1px solid black'
    //         tdTime.style.border='1px solid black'
    //         tdID.style.background='#DFD1A2'
    //         tdTime.style.background='#DFD1A2'
    //         tdID.style.width='150px'
    //         tdTime.style.width='150px'
    //         tdID.style.textAlign='center'
    //         tdTime.style.textAlign='center'


    //         tdID.appendChild(TextID)
    //         tdTime.appendChild(TextTime)
    //         TRi.appendChild(tdID)
    //         TRi.appendChild(tdTime)
    //         table.appendChild(TRi)

    //         tdID.style.cursor='pointer'

    //         if (i==this.Length-1){
    //           var listitems=document.getElementsByTagName('td')
    //               listitems[listitems.length-1].style.borderBottomRightRadius="30px"
    //               listitems[listitems.length-2].style.borderBottomLeftRadius="30px"

    //           const element2=<HTMLInputElement>document.getElementById('row4')
    //           element2.innerHTML=''
    //           const B2=document.createElement('button')
    //           B2.setAttribute('class','btn')
    //           B2.style.background='#eaca60'
    //           B2.style.borderRadius='25px'
    //           B2.style.width='150px'
    //           B2.textContent='Selected Train Location'
    //           B2.style.marginTop='15px'
    //           B2.setAttribute('id','b2')
    //           B2.disabled=true
    //           element2.appendChild(B2)


    //         }

    //           tdID.addEventListener('mouseover',(event)=>{
    //             this.hoverin(event)
    //           })

    //           tdID.addEventListener('mouseout',(event)=>{
    //             this.hoverout(event)
    //           })

    //         tdID.addEventListener('click',(event)=>{
    //           this.ablebutton(event,Number(tdID.textContent))
    //         })
          
      
    //   }
      }   
  }


  hoverin(event: any){
    var listitems=document.getElementsByTagName('td')
                for (var i=0;i<listitems.length;i++){
                  if(this.x!=listitems[i]){
                listitems[i].style.background='#DFD1A2'
              }
              }
                event.target.style.background='#eaca60'
              }



  hoverout(event: any){
    var listitems=document.getElementsByTagName('td')
                for (var i=0;i<listitems.length;i++){
                  if(this.x!=listitems[i]){
                listitems[i].style.background='#DFD1A2'
              }
              }
              }

  

  ablebutton(event: any,id:number){
    var listitems=document.getElementsByTagName('td')
    for (var i=0;i<listitems.length;i++){
      listitems[i].style.background='#DFD1A2'
   }
  //  if(this.x!=event.target){
  //  const element2 = <HTMLInputElement> document.getElementById('map')
  //   element2.innerHTML=''
  // }
    event.target.style.background='#eaca60'
    this.x=event.target
    var element = <HTMLInputElement> document.getElementById("b2");
      element.disabled = false;
      element.textContent='Selected Train '+id+' Location'
      element.addEventListener('click',()=>{
        
        this.trainInformation.GetTrianLocation2(id,this.session).subscribe(
          (response) => {this.trainLocation=response},
          (error) =>{console.log(error);
            //this.errorMessageID = error;
          },
          ()=>{ this.MapGoogleCode()}
        )
       
      })
  }



  MapGoogleCode(): void {
    const myLatlng = { lat: this.trainLocation.locationLat, lng: this.trainLocation.locationLng };
    const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 13,
          center: myLatlng,
        });
    const marker = new google.maps.Marker({
        position: myLatlng,
        map,
        title: "Click to zoom",
    });
    map.addListener("center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the marker.
        window.setTimeout(() => { map.panTo(marker.getPosition()as google.maps.LatLng );}, 3000);
    });
    marker.addListener("click", () => {
        map.zoom++;
        map.setCenter(marker.getPosition()as google.maps.LatLng );
    });

  }



}
