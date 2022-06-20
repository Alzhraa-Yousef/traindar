import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from '../servises/train.service';
import { TRain,Location} from '../shared/train';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

declare const L:any;
declare var google: any;


@Component({
  selector: 'app-searchtrain-id',
  templateUrl: './searchtrain-id.component.html',
  styleUrls: ['./searchtrain-id.component.scss']
})
export class SearchtrainIDComponent implements OnInit {
  //train:TRain=new TRain(111111,27.180134,31.189283,'up','VIP');
  trainLocation:Location|any=new Location(27.180134,31.189283);
  zoom:number=10;
  mapFlag:boolean|undefined;
  selectFlag:boolean|undefined;
  errorMessageID:string|undefined;

  trainIDList:any
  errorMessageLatLng:string|undefined;
  session:string| any;
  
  

  constructor(private elementRef:ElementRef,private trainID:TrainService,private router: Router,) { }

  ngOnInit(): void {

    this.session=localStorage.getItem('UserID');
    if( this.session=='')
       {this.router.navigate(['loginform'])  ;}
  
   else{
           //httpget to get Trainidlist for selectoptions
    this.trainID.GetTrainIDList().subscribe(
      (response) => {this.trainIDList=response},
      (error) =>{console.log(error);
                   this.errorMessageID = error;
                  //  Swal.fire({
                  //        title: 'Error',
                  //        html: this.errorMessageID,
                  //        iconHtml: '<img src="../../assets/error.png">',
                  //        background:'#DFD1A2',
                  //        showCancelButton: true,
                  //        confirmButtonColor: '#F6BC00',
                  //        cancelButtonColor: '#F6BC00',
                  //        cancelButtonText:'No',
                  //        confirmButtonText: 'Yes',
                  //        width:400, })
                }
              );
        }
    
  }





  Send(){
    var selectedIDMenu = this.elementRef.nativeElement.querySelector('#trainIDMenu');
    var selectedID=selectedIDMenu.options[selectedIDMenu.selectedIndex].text;
    if(selectedID=="Select train ID"){
      console.log( "no");
      this.mapFlag=false;
      this.selectFlag=true;
    }
    else {
      //httpget to get latlng
      this.selectFlag=false;
      this.mapFlag=true;
      this.elementRef.nativeElement.querySelector('#brr').innerHTML = "<br><br><br>";
      //httpget to get TrainiLatLng for map
      this.trainID.GetTrainLocation(selectedID,this.session).subscribe(
        (response) => {this.trainLocation=response;},
        (error) =>{console.log(error);
          this.errorMessageLatLng = error;
                    console.log(error);
                    //if(typeof this.errorMessageLatLng == 'undefined' ) { } 
                     Swal.fire({
                         title: 'Error',
                         html: this.errorMessageLatLng,
                         iconHtml: '<img src="../../assets/error.png">',
                         //background:'#DFD1A2',
                         showCancelButton: true,
                         confirmButtonColor: '#F6BC00',
                         cancelButtonColor: '#F6BC00',
                         cancelButtonText:'No',
                         confirmButtonText: 'Yes',
                         width:400, })
                  },
                      
          ()=>{this.MapGoogleCode();}            
                      );
      
      //this.showLocationonLeaflet();

      
       }

  }

  
  clickedMarker(){
    this.zoom++;
  }




  MapGoogleCode(): void {
    const myLatlng = { lat: this.trainLocation.locationLat, lng: this.trainLocation.locationLng };
    let x=13;
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 13,
        center: myLatlng,
      }
    );
  
    const marker = new google.maps.Marker({
      position: myLatlng,
      map,
      title: "Click to zoom",
    });
  
    map.addListener("center_changed", () => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(() => {
        map.panTo(marker.getPosition()as google.maps.LatLng );
      }, 3000);
    });
  
    marker.addListener("click", () => {
      map.zoom++;
      map.setCenter(marker.getPosition()as google.maps.LatLng );//as google.maps.LatLng
    });
  }

  




  showLocationonLeaflet(){
        //for leaflet amp
        let mymap = new L.map('map').setView([this.trainLocation.lat, this.trainLocation.lng], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWx6aHJhYXlvdXNlZiIsImEiOiJjbDBpcjIyN3gwNTkyM2ltcmUzamI4NGRnIn0.bZacRNNLNh0n9yjML7KTWA'
        }).addTo(mymap);
        let marker = L.marker([this.trainLocation.lat, this.trainLocation.lng]).addTo(mymap);
        marker.bindPopup("<b>hello</b>").openPopup();
        let popup = L.popup()
        .setLatLng([this.trainLocation.lat,this.trainLocation.lng])
        .setContent("I am a Train .")
        .openOn(mymap);
  }




  watchLocation() {
      let deslat=0;
      let deslng=0;
      let id=navigator.geolocation.watchPosition((position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(longitude,' :',latitude);
        if(latitude===deslat){navigator.geolocation.clearWatch(id)}//وصلت الى الموقع المقصود 
      },
      (error)=>{
        console.log(error.code)
        const { code } = error;
        switch (code) {
          case GeolocationPositionError.TIMEOUT:
            // Handle timeout.
            break;
          case GeolocationPositionError.PERMISSION_DENIED:
            // User denied the request.
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            // Position not available.
            break;
        }
      },
      {enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0 ,
      } )
  }


  
  // getlocation3(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position)=>{
  //       const cords=position.coords;
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;

  //       let map = new google.maps.Map(document.getElementById("map3") as HTMLElement, {
  //         center: { lat: latitude, lng: longitude },
  //         zoom: 8,
  //       });
  //       const myLatLng = { lat: latitude, lng: longitude};
  //       new google.maps.Marker({
  //         position: myLatLng,
  //         map,
  //         title: "Hello World!",
  //       });
  //       console.log(longitude,' :',latitude);
  //       this.train.lat=latitude;
  //       this.train.lng=longitude;
  //     });
  // } else {
  //   //الموقع الجغرافي ليس مدعوما في الجهاز
  //    console.log("No support for geolocation")
  // }
  // this.watchLocation();
  // }



  // getLocationLeaflet(){
  //   // this.elementRef.nativeElement.querySelector('#map').innerHTML = "< div id='map' style='width:1000px; height: 400px;'>";
  //   // var container = L.DomUtil.get('map');
  //   // if(container != null){
  //   // container._leaflet_id = null;
  //   // }
  //   //var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }
  //       let mymap = new L.map('map').setView([this.train.lat, this.train.lng], 13);
  //       //for ARABIC leaflet amp
  //       // let mapLink ='<a href="http://openstreetmap.org">OpenStreetMap</a>';
  //       // L.tileLayer(
  //       //   'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       //     attribution: '&copy; ' + mapLink + ' Contributors',
  //       //     maxZoom: 18,
  //       //   }).addTo(mymap);
  //        //for ENGLISH leaflet amp
  //       L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  //       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //       maxZoom: 18,
  //       id: 'mapbox/streets-v11',
  //       tileSize: 512,
  //       zoomOffset: -1,
  //       accessToken: 'pk.eyJ1IjoiYWx6aHJhYXlvdXNlZiIsImEiOiJjbDBpcjIyN3gwNTkyM2ltcmUzamI4NGRnIn0.bZacRNNLNh0n9yjML7KTWA'
  //       }).addTo(mymap);
  //       let marker = L.marker([this.train.lat, this.train.lng]).addTo(mymap);
  //       marker.bindPopup("<b>hello</b>").openPopup();
  //       let popup = L.popup()
  //       .setLatLng([this.train.lat,this.train.lng])
  //       .setContent("I am a Train .")
  //       .openOn(mymap);
  // }

  

}
