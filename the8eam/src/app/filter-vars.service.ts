import { Injectable } from '@angular/core';

@Injectable()
export class FilterVarsService {
   gMusic: boolean;
   gArt: boolean;
   gFilm: boolean;
   gFood: boolean;
   gLit: boolean;
   gDance: boolean;
   gFamily: boolean;
   cost: number;
   date: number;
   searchTxt: string;
   curDate: Date;
   loc: number;
   dist: number;

  constructor() {
    this.gMusic = false;
    this.gArt = false;
    this.gFilm = false;
    this.gFood = false;
    this.gLit = false;
    this.gDance = false;
    this.gFamily = false;
    this.cost = -1;
    this.date = -1;
    this.loc = -1;
    this.dist = 0.5;
    this.searchTxt = "";
    this.curDate = new Date();
  }

  setMusic(){
    this.gMusic = !this.gMusic;
  }
  setArt(){
    this.gArt = !this.gArt;
  }
  setFilm(){
    this.gFilm = !this.gFilm;
  }
  setFood(){
    this.gFood = !this.gFood;
  }
  setLit(){
    this.gLit = !this.gLit;
  }
  setDance(){
    this.gDance = !this.gDance;
  }
  setFamily(){
    this.gFamily = !this.gFamily;
  }

  setLoc(location: number){
    if (this.loc == location){
      this.loc = -1;
    }
    else
      this.loc = location;
  }

  setDist(distance: number){
    if (this.dist == distance){
      this.dist = 0.5;
    }
    else
      this.dist = distance;
  }

  setCost(cost: number){
    if (this.cost == cost){
      this.cost = -1;
    }
    else
      this.cost = cost;
  }

  setDate(date: number)
  {
    if (this.date == date){
      this.date = -1;
    }
    else
      this.date = date;
  }

  setSearch(search: string){
    console.log("set search text: " + search);
    this.searchTxt = search;
  }

  clearFilters(){
    this.gMusic = false;
    this.gArt = false;
    this.gFood = false;
    this.gLit = false;
    this.gDance = false;
    this.gFamily = false;
    this.gFilm = false;
    this.cost = -1;
    this.date = -1;
    this.loc = -1;
    this.dist = 0.5
    this.searchTxt = '';

    //need to be able to clear the visual text as well
    //this.searchTxt = "";
  }

}
