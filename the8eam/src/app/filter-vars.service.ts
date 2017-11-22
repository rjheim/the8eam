import { Injectable } from '@angular/core';

@Injectable()
export class FilterVarsService {
   gMusic: boolean;
   gArt: boolean;
   gFood: boolean;
   gSW: boolean;
   gDance: boolean;
   cost: number;
   date: number;

  constructor() {
    this.gMusic = false;
    this.gArt = false;
    this.gFood = false;
    this.gSW = false;
    this.gDance = false;
    this.cost = -1;
    this.date = -1;
  }

  setMusic(){
    this.gMusic = !this.gMusic;
  }
  setArt(){
    this.gArt = !this.gArt;
  }
  setFood(){
    this.gFood = !this.gFood;
  }
  setSW(){
    this.gSW = !this.gSW;
  }
  setDance(){
    this.gDance = !this.gDance;
  }

  setCost(cost: number){
    if (this.cost == cost){
      this.cost = -1;
    }
    else
      this.cost = cost;
    console.log(this.cost);
  }

  setDate(date: number)
  {
    if (this.date == date){
      this.date = -1;
    }
    else
      this.date = date;
    console.log(this.date);
  }

}
