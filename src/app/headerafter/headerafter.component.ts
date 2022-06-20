import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerafter',
  templateUrl: './headerafter.component.html',
  styleUrls: ['./headerafter.component.scss']
})
export class HeaderafterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clearLoginInformation(){
  localStorage.setItem('UserID','');
  }

}
