import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input()
  eventItem: Event;
  showInfo : boolean;
  report: boolean;
  constructor() {
    this.showInfo = false;
    this.report = false;
  }

  ngOnInit() {
  }

  toggleInfo(){
    this.showInfo = !this.showInfo;
  }
  toggleReport(event : boolean){
    this.report = event;
  }
}
