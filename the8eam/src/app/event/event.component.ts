import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../data-access-layer/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input()
  eventItem: Event;
  reporting = false;
  constructor() { }

  ngOnInit() {
  }
  /*
     Triggers the report modul to open
   */
  reportWindow() {
    this.reporting = !this.reporting;
  }
}
