import { Component, OnInit } from '@angular/core';
import { FilterVarsService } from '../filter-vars.service'

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.css']
})
export class OptionsMenuComponent implements OnInit {

  // The tab selected to view
  filterTab : number;
  // which filters are on
  genreFilters : string;   // more than one genre can be selected
  dateFilter : string;
  costFilter : string;
  locFilter : string; // more than one location can be selected




  constructor(private filter: FilterVarsService) {
    // Genre is the default view
    this.filterTab = 1;
    this.genreFilters = "";
    this.dateFilter = "";
    this.costFilter = "";
    this.locFilter = "";
  }

  /*
    @view the tab selected, 1-4, Genre through Location
   */
  clickViewTab( view:number){
    if(view < 1 || view  > 4 || view == null) this.filterTab = 1;
    this.filterTab = view;
  }
  clickGenreFilter( filterName:string ) {
    let index = this.genreFilters.indexOf ( filterName );
    // if genrefilters contains filterName, remove it (turn it off)
    if (index >= 0) {
      this.genreFilters = this.genreFilters.substring ( 0 , index ) + this.genreFilters.substring ( index + filterName.length , this.genreFilters.length );
    }
    // else genreFilters doesn't have the filter name (it's off), we add it (turn it on)
    else{
      this.genreFilters += filterName;
    }
  }
  clickDateFilter ( filterName:string ) {
    if(this.dateFilter != filterName )
      this.dateFilter = filterName;
    else
      this.dateFilter = "";
  }
  clickCostFilter ( filterName:string ) {
    if(this.costFilter != filterName )
      this.costFilter = filterName;
    else
      this.costFilter = ""
  }
  clickLocFilter( filterName:string ){
    var index = this.locFilter.indexOf(filterName);
    // if locationfilters contains filterName, remove it (turn it off)
    if(index >= 0)
      this.locFilter = this.locFilter.substring(0, index) + this.locFilter.substring(index+filterName.length,this.locFilter.length);
    // else locFilter doesn't have the filter name (it's off), we add it (turn it on)
    else
      this.locFilter += filterName;
  }

  isFiltered( filterCtg, filterName ){
    if(filterCtg.indexOf(filterName) >= 0)
      return true;
    return false;
  }









  ngOnInit() {
  }

}
