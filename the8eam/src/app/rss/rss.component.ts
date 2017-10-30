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
    //this.calendar = db.collection<Event>('calendar');
  }

  testRSS() {

    // rssGet = require('rss-to-json');

    rssGet.load('https://isthmus.com/search/event/calendar-of-events/index.rss', function (err, rss) {
      //console.log(rss);


      // get the specific items (go one layer down)
      var items = rss["items"];
      for (var key in items) {

        var title = items[key]["title"];
        var titleIndex = title.indexOf(" - ");
        var timeIndex = title.indexOf(" @ ");

        // parse in the event name
        var eventName = title.substring(0, titleIndex);
        console.log(title.substring(0, titleIndex));

        // parse the event time
        var time = title.substring(titleIndex + 3, timeIndex);
        console.log(title.substring(titleIndex + 3, timeIndex));

        // parse the location
        var location = title.substring(timeIndex + 3);
        console.log(title.substring(timeIndex + 3));

        var description = items[key][" description"];
        var link = items[key]["link"];

        // COST PARSING GOES HERE


      }
    });



  }

  ngOnInit(){

  }

}
