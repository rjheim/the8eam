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
  constructor() {
    this.showInfo = false;
  }

  ngOnInit() {
  }

  toggleInfo(){
    this.showInfo = !this.showInfo;
  }
}
