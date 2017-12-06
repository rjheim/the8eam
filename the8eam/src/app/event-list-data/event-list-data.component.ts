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
  loadNum: number;
  report: Event;

  constructor ( public dal: DataAccessLayerService , public filter: FilterVarsService ) {
    this.loadNum = 15;
    this.eventList= this.dal.getList();
  }

  loadOnScroll () {
    this.loadNum+= 15;
  }


}
