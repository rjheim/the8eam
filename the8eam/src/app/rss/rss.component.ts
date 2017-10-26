import { Component, OnInit } from '@angular/core';
import { DataAccessLayerComponent } from '../data-access-layer/data-access-layer.component';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Event } from '../data-access-layer/event';
//import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-rss',
  providers: [DataAccessLayerComponent],
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {
  eventToAdd: Event;
  calendar: AngularFirestoreCollection<Event>;
  list: AngularFirestoreCollection<Event>;

  constructor(private dal: DataAccessLayerComponent) {
    this.eventToAdd = {} as Event;
  }

  ngOnInit() {

  }

}
