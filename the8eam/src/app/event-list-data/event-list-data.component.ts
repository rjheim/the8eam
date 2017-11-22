import { Component, OnInit } from '@angular/core';
import { FilterVarsService } from '../filter-vars.service'
import { DataAccessLayerService } from '../data-access-layer.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-event-list-data',
  providers: [DataAccessLayerService],
  templateUrl: './event-list-data.component.html',
  styleUrls: ['./event-list-data.component.css']
})
export class EventListDataComponent implements OnInit {
  listItems: Observable<any>;
  report: Event;

  constructor(private dal: DataAccessLayerService, private filter: FilterVarsService) {
    this.listItems = dal.getList();
  }

  ngOnInit() {
  }

}
