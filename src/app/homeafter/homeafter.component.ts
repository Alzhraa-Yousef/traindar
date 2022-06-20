import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from '../servises/train.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
//declare var $: any;

@Component({
  selector: 'app-homeafter',
  templateUrl: './homeafter.component.html',
  styleUrls: ['./homeafter.component.scss']
})
export class HomeafterComponent implements OnInit {
  session:string| any;
  //service1Flag:boolean|undefined=true;
  lat:any;
  lng:any;
  lat3:any;
  lng3:any;

  selectFlag:boolean|undefined;
  errorMessageID:string|undefined;
  trainIDList:any;
  geolocationerror:string | undefined;
  
  constructor(private router: Router,private elementRef:ElementRef,private trainID:TrainService) { }

  ngOnInit(): void {
    this.session=localStorage.getItem('UserID');
      if( this.session=='')
         {this.router.navigate(['loginform'])  ;}  
    
  }

  Sweetalert(){
    Swal.fire({
      title: 'Download',
      html: "To activate the feature, Download this "+
      '<a href="https://www.google.com/">App</a> ' ,
      iconHtml: '<img src="../../assets/icons8-download-48.png" >',
      //background:'#DFD1A2',
      showCancelButton: true,
      confirmButtonColor: '#F6BC00',
      cancelButtonColor: '#F6BC00',
      confirmButtonText: 'OK'
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     Swal.fire(
          //       'Deleted!',
          //       'Your file has been deleted.',
          //       'success'
          //     )
          //   }
          }) ;
  }


//    showTrainIDList(): void{
//     this.service1Flag=false;
//     this.trainID.GetTrainIDList().subscribe(
//       (response) => {this.trainIDList=response},
//       (error) =>{console.log(error);
//             this.errorMessageID = error; }
//               );
 
//    }


//    getUserLocation(){

//     var selectedIDMenu = this.elementRef.nativeElement.querySelector('#trainIDMenu');
//     var selectedID=selectedIDMenu.options[selectedIDMenu.selectedIndex].text;
//     if(selectedID=="Select train ID"){
//       console.log( "no");
//       this.selectFlag=true;
//     }
//     else {      
     
//       $.confirm({
//         title: 'Confirm!',
//         content: 'Are you sure you want to share the location?',
        
//         buttons: {
//             Yes:  ()=> {
              
//               $.alert({
//                 title: 'Thank You ',
//                 content: 'The location has been successfully shared.If it is correct'+'<div><br></div>'+' TrainDar will increase your points',
//             });
//             this.getLocation();
//             },
//             No: ()=>{
//                 $.alert('Canceled!');
//             }, 
            
//         }, 
//     });
// }


//    }




// getLocation(){
//    this.selectFlag=false;
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position)=>{
//           const cords=position.coords;
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//          // console.log(longitude,' :',latitude);
//           this.lat=latitude;
//           this.lng=longitude;
//         });
        
//     } else {
//       //الموقع الجغرافي ليس مدعوما في الجهاز
//        console.log("No support for geolocation")
//     }
//     this.watchposition();
//     //setTimeout(() => {this.service1Flag=true;},1000);
  

// }





//   watchposition() {
//     let deslat=0;
//     let deslng=0;
  
//     let id=navigator.geolocation.watchPosition((position)=>{
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       console.log(longitude,' :',latitude);
//       this.lat3=latitude;
//       this.lng3=longitude;
//       if(latitude===deslat){navigator.geolocation.clearWatch(id)}//وصلت الى الموقع المقصود 
//     },
//     (error)=>{
//       console.log(error.code)
//       const { code } = error;
//       switch (code) {
//         case GeolocationPositionError.TIMEOUT:
//           this.geolocationerror= "The request to get user location timed out."
//           // Handle timeout.
//           break;
//         case GeolocationPositionError.PERMISSION_DENIED:
//           this.geolocationerror="User denied the request for Geolocation."
//           // User denied the request.
//           break;
//         case GeolocationPositionError.POSITION_UNAVAILABLE:
//           this.geolocationerror="Location information is unavailable."
//           // Position not available.
//           break;
//       }
//       console.log(this.geolocationerror)
//     },

//     {enableHighAccuracy:true,
//       timeout:2000,
//       maximumAge:0 }
//                                         )
  
// }



}
