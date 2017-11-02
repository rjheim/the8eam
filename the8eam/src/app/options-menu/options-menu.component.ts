import { Component, OnInit } from '@angular/core';
import { FilterVarsService } from '../filter-vars.service'

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.css']
})
export class OptionsMenuComponent implements OnInit {
  genreTabbed = true;
  priceTabbed = false;
  locationTabbed = false;
  dateTabbed = false;

  //different genre filters
  _music = "";
  _dance = "";
  _food = "";
  _art = "";
  _sw = "";

  //different date filters
  // _today = "";
  // _tomorrow = "";
  // _thisweek = "";
  // _thismonth = "";

  //diff cost filters
  _free = "";
  _less10 = "";
  _less20 = "";
  _less50 = "";
  _less100 = "";


  constructor(private filter: FilterVarsService) { }
  genreTab(){
    this.genreTabbed = true;
    this.priceTabbed = !this.genreTabbed;
    this.locationTabbed = !this.genreTabbed;
    this.dateTabbed = !this.genreTabbed;
  }
  priceTab(){
    this.priceTabbed = true;
    this.genreTabbed = !this.priceTabbed;
    this.locationTabbed = !this.priceTabbed;
    this.dateTabbed = !this.priceTabbed;
  }
  locationTab(){
    this.locationTabbed = true;
    this.priceTabbed = !this.locationTabbed;
    this.genreTabbed = !this.locationTabbed;
    this.dateTabbed = !this.locationTabbed;
  }
  dateTab(){
    this.dateTabbed = true;
    this.priceTabbed = !this.dateTabbed;
    this.locationTabbed = !this.dateTabbed;
    this.genreTabbed = !this.dateTabbed;
  }

  //shows that genre filters are on
  musicOn(){
    if(this._music.length == 0) {
      this._music = ": ON";
      return
    }
    this._music = "";
  }
  danceOn(){
    if(this._dance.length == 0) {
      this._dance = ": ON";
      return
    }
    this._dance = "";
  }
  foodOn(){
    if(this._food.length == 0) {
      this._food= ": ON";
      return
    }
    this._food= "";
  }
  swOn(){
    if(this._sw.length == 0) {
      this._sw= ": ON";
      return
    }
    this._sw= "";
  }
  artOn(){
    if(this._art.length == 0) {
      this._art= ": ON";
      return
    }
    this._art= "";
  }

  // //shows what date filters are on
  // todayOn(){
  //   if(this._today.length == 0) {
  //     this._today = ": ON";
  //     return
  //   }
  //   this._today = "";
  // }
  // tomorrowOn(){
  //   if(this._today.length == 0) {
  //     this._today = ": ON";
  //     return
  //   }
  //   this._today = "";
  // }
  // weekOn(){
  //   if(this._today.length == 0) {
  //     this._today = ": ON";
  //     return
  //   }
  //   this._today = "";
  // }
  // monthOn(){
  //   if(this._today.length == 0) {
  //     this._today = ": ON";
  //     return
  //   }
  //   this._today = "";
  // }

  //shows what cost filters are on
  freeOn(){
    if(this._free.length == 0) {
      this._free = ": ON";
      return
    }
    this._free = "";
  }
  c10On(){
    if(this._less10.length == 0) {
      this._less10 = ": ON";
      return
    }
    this._less10 = "";
  }
  c20On(){
    if(this._less20.length == 0) {
      this._less20 = ": ON";
      return
    }
    this._less20 = "";
  }
  c50On(){
    if(this._less50.length == 0) {
      this._less50 = ": ON";
      return
    }
    this._less50 = "";
  }
  c100On(){
    if(this._less100.length == 0) {
      this._less100 = ": ON";
      return
    }
    this._less100 = "";
  }

  ngOnInit() {
  }

}
