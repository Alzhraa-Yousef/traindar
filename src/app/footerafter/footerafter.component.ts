import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-footerafter',
  templateUrl: './footerafter.component.html',
  styleUrls: ['./footerafter.component.scss']
})
export class FooterafterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Sweetalert(){
    Swal.fire({
      title: 'Download',
      html: "To activate the feature, Download this "+
      '<a href="https://www.google.com/">App</a> ' ,
      iconHtml: '<img src="../../assets/icons8-download-48.png" >',
      confirmButtonColor: '#F6BC00',
      confirmButtonText: 'OK'
          }) ;
  }

}
