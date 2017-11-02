import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.css']
})
export class OptionsMenuComponent implements OnInit {

  genreTab: boolean;
  priceTab: boolean;
  locationTab: boolean;
  dateTab: boolean;

  constructor() {
    this.genreTab = true;
    this.priceTab = false;
    this.locationTab = false;
    this.dateTab = false;
  }
  clickView(){
    this.genreTab = true;
    this.priceTab = false;
    this.locationTab = false;
    this.dateTab = false;
  }
  clickView2(){
    this.genreTab = false;
    this.priceTab = false;
    this.locationTab = false;
    this.dateTab = true;
  }
  clickView3(){
    this.genreTab = false;
    this.priceTab = true;
    this.locationTab = false;
    this.dateTab = false;
  }
  clickView4(){
    this.genreTab = false;
    this.priceTab = false;
    this.locationTab = true;
    this.dateTab = false;
  }
  ngOnInit() {
  }

}
