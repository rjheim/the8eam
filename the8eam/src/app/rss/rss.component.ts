import { Component, OnInit } from '@angular/core';
import { DataAccessLayerComponent } from '../data-access-layer/data-access-layer.component';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Event } from '../data-access-layer/event';
import { rss } from 'rss-to-json/src/rss';
import { xml2js } from 'xml2js';
import { request } from 'request';
import * as rssGet from 'rss-to-json'
//import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-rss',
  providers: [DataAccessLayerComponent],
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {
  eventToAdd: Event
  calendar: AngularFirestoreCollection<Event>;
  list: AngularFirestoreCollection<Event>;

  constructor(private dal: DataAccessLayerComponent) {
    this.eventToAdd = {} as Event;
  }

  testRSS() {

    // rssGet = require('rss-to-json');

    rssGet.load('https://isthmus.com/search/event/calendar-of-events/index.rss', function (err, rss) {
      console.log(rss);
    });
  }

  ngOnInit(){

  }

}
