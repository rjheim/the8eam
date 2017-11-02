import { Injectable } from '@angular/core';

@Injectable()
export class FilterVarsService {
  private gMusic: boolean;
  private gArt: boolean;
  private gFood: boolean;
  private gSW: boolean;
  private gDance: boolean;

  constructor() {
    this.gMusic = false;
    this.gArt = false;
    this.gFood = false;
    this.gSW = false;
    this.gDance = false;
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

}
