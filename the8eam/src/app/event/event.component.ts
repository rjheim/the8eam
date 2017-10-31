import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input()
  eventItem:Observable<any>;

  constructor() { }

  ngOnInit() {
  }

}
