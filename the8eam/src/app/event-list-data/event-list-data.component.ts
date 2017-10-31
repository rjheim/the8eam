import { Component, OnInit } from '@angular/core';
import { DataAccessLayerComponent } from '../data-access-layer/data-access-layer.component';
import {Observable} from 'rxjs/Observable';
import { ReportPipe } from "../report.pipe";

@Component({
  selector: 'app-event-list-data',
  providers: [DataAccessLayerComponent],
  templateUrl: './event-list-data.component.html',
  styleUrls: ['./event-list-data.component.css']
})
export class EventListDataComponent implements OnInit {
  listItems: Observable<any>;
  report: Event;

  constructor(private dal: DataAccessLayerComponent) {
    this.listItems = dal.getList();
  }

  ngOnInit() {
  }

}
