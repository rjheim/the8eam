import { Component } from '@angular/core';
import { FilterVarsService } from '../filter-vars.service'
import { DataAccessLayerService } from '../data-access-layer.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-event-list-data',
  providers: [DataAccessLayerService],
  templateUrl: './event-list-data.component.html',
  styleUrls: ['./event-list-data.component.css']
})
export class EventListDataComponent {
  listItems: Observable<any>;
  report: Event;

  constructor(public dal: DataAccessLayerService, public filter: FilterVarsService) {
    this.listItems = dal.getList();
  }

}
