import {Injectable} from '@angular/core';
import {Event} from './event';
import * as parser1 from 'xml2js';
import {request} from 'request';
import {Observable} from 'rxjs/Observable';
import * as ical from 'ical';
import { DataAccessLayerService } from './data-access-layer.service';

// Parsing Files
import {UW} from './parsers/UW';
import {Majestic} from "./parsers/Majestic";
import {Isthmus} from "./parsers/Isthmus";




@Injectable()
export class RssService {
  dupObserve: Observable<Event[]>;
  uw = new UW();
  maj = new Majestic();
  isth = new Isthmus();
  eventsToAdd : Array<Event>;

  constructor(private dal: DataAccessLayerService) {
    this.eventsToAdd = [];
  }

  testRSS() {
    //this.isth.getIsthmusEvents();
    let that = this;
    this.uw.getUWEvents(function(events){
      console.log(events);
      // check for duplicates here
      for (let event in events) {
        that.dupObserve = that.dal.whereTitleAndDate(events[event].title, events[event].date);
        that.dupObserve.subscribe(data => {
          if (data.length < 1) {
            console.log("Added " + events[event]);
            //that.dal.addToList(events[event]);
          }
        })
      }


    });

    this.isth.getIsthmusEvents(function(events){
      console.log(events);
      // check for duplicates here
      for (let event in events) {
        that.dupObserve = that.dal.whereTitleAndDate(events[event].title, events[event].date);
        that.dupObserve.subscribe(data => {
          if (data.length < 1) {
            console.log("Added " + events[event]);
            //that.dal.addToList(events[event]);
          }
        })
      }


    });
    //this.testiCal();
    // UNCOMMENT THIS IF YOU WANT TO ADD THE EVENTS OF THE DAY TO THE DATABASE


  }

  testiCal() {
    let list: Array<Event> = [];
    var myInit = {
      method: 'GET',
      mode: 'no-cors',
      cache: 'default'
    };

    //var data = ical.parseFile('majestic-theatre-7360f72fe39.ics');
    //console.log(data);
    ical.fromURL('https://www.madisonfrequency.com/feed/ical/', {}, function(err, ical) {

      //console.log(ical);
      /*for (var event in ical) {
        //console.log(ical[event]);
        var eventToAdd = {} as Event;
        eventToAdd.title = ical[event].summary;
        eventToAdd.location = ical[event].location;

      }*/
    })


  }


  testParse() {
    var parseString = parser1.parseString;
    parseString();
  }


}
