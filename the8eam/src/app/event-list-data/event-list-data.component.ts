import { Component } from '@angular/core';
import { FilterVarsService } from '../filter-vars.service'
import { DataAccessLayerService } from '../data-access-layer.service';
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-event-list-data',
  providers: [DataAccessLayerService],
  templateUrl: './event-list-data.component.html',
  styleUrls: ['./event-list-data.component.css']
})
export class EventListDataComponent {
  eventList: Observable<any>;
  interval : number;
  loadedList : Observable<any>;
  report: Event;

  constructor(public dal: DataAccessLayerService, public filter: FilterVarsService) {
    this.interval = 20;
    this.eventList = dal.getList();//.bufferCount(this.interval);
  }
  loadOnScroll(){
    this.interval += this.interval;
    this.loadedList = this.eventList.bufferCount(this.interval);
  }


}
