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
  ngOnInit() {
  }

}
