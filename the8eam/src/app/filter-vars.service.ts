import { Injectable } from '@angular/core';

@Injectable()
export class FilterVarsService {
  private gMusic: boolean;
  private gArt: boolean;
  private gFood: boolean;
  private gSW: boolean;
  private gDance: boolean;
  private cost: number;
  private date: number;

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
    this.cost = cost;
  }

  setDate(date: number)
  {
    this.date = date;
  }

}
