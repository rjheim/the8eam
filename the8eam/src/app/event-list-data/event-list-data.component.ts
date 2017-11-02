import { Component, OnInit } from '@angular/core';
import { FilterVarsService } from '../filter-vars.service'
import { DataAccessLayerComponent } from '../data-access-layer/data-access-layer.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-event-list-data',
  providers: [DataAccessLayerComponent, FilterVarsService],
  templateUrl: './event-list-data.component.html',
  styleUrls: ['./event-list-data.component.css']
})
export class EventListDataComponent implements OnInit {
  listItems: Observable<any>;
  report: Event;

  constructor(private dal: DataAccessLayerComponent, private filter: FilterVarsService) {
    this.listItems = dal.getList();
  }

  ngOnInit() {
  }

}
