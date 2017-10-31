import { Component, OnInit } from '@angular/core';
import { DataAccessLayerComponent } from '../data-access-layer/data-access-layer.component';
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

  constructor(private dal: DataAccessLayerComponent) {

  }

  testRSS() {

    // rssGet = require('rss-to-json');

    let list: Array<Event> = [];
    var promise = new Promise((resolve, reject) => {

    rssGet.load('https://isthmus.com/search/event/calendar-of-events/index.rss', function (err, rss) {
      // get the specific items (go one layer down)
      var items = rss["items"];
      var eventToAdd = {} as Event;
      for (var key in items) {
        var title = items[key]["title"];
        // TODO figure out what to do with no dash lmao
        var titleIndex = title.indexOf(" - ");


        var timeIndex = title.indexOf(" @ ");
        if (timeIndex == -1) {
          timeIndex = title.length;
        }

        // parse in the event NAME
        var eventName = title.substring(0, titleIndex);

        eventToAdd.title = eventName;
        console.log(title.substring(0, titleIndex));


        // parse the event TIME
        var time = title.substring(titleIndex + 3, timeIndex);
        eventToAdd.time = time;
        //console.log(title.substring(titleIndex + 3, timeIndex));
        var splitted = time.split(" ", 5);
        //console.log(splitted);

        // month
        let month = 0;
        let day = '';
        switch (splitted[0]) {
          case'Jan':
            month = 1;
            break;
          case'Feb':
            month = 2;
            break;
          case'Mar':
            month = 3;
            break;
          case'Apr':
            month = 4;
            break;
          case'May':
            month = 5;
            break;
          case'Jun':
            month = 6;
            break;
          case'Jul':
            month = 7;
            break;
          case'Aug':
            month = 8;
            break;
          case'Sep':
            month = 9;
          case'Oct':
            month = 10;
            break;
          case'Nov':
            month = 11;
            break;
          case'Dec':
            month = 12;
            break;
          default:

            break;
        }


        // day
        if (splitted[1].length == 3) {
          day = splitted[1].substr(0, 2);
        }
        else {
          day = `0` + splitted[1].substr(0, 1);
        }
        //console.log(month + ', ' + day);

        // year
        var year = +splitted[2];




        var specTime = "";
        // CHECK TO MAKE SURE THERE IS A TIME
        if (splitted[3]) {

          // TIME
          var specTime = "" + splitted[3];

          let isMorn: boolean = false;

          if (splitted[4] == "AM") {
            isMorn = true;
          }

          // for the hour, then minute
          var timeSplit = specTime.split(':', 2);
          var hour, minute = "";

          // add 12 for 24 hour time if we need to
          hour = timeSplit[0];
          if (isMorn != true) {
            hour = +timeSplit[0] + 12;
          }

          if (specTime.length == 4 && isMorn) {

            hour = "0" + hour;

          }

          // MINUTE TIMEEEEEEEEEE
          minute = "" + timeSplit[1];
          specTime = hour + minute;
          //console.log(specTime);
        } else {
          specTime = "0000";
        }

        // THIS IS THE FULL DATE, AS A STRING
        var date = "" + month + day + year;

        //console.log(date);

        // parse and add the LOCATION
        var location = title.substring(timeIndex + 3);
        if (location.length < 1) {
          location = "See description.";
        }
        eventToAdd.location = location;
        //console.log(location);

        // parse and add the event DESCRIPTION
        var description = items[key]["description"];

        eventToAdd.description = description;

        // parse and add the event LINK
        var link = items[key]["link"];
        eventToAdd.link = link;






        // parse and add the event COST
        var cost = 0;
        var free = description.toLowerCase().indexOf("free");
        if (free != -1) {
          console.log("IT'S FREE");
        }

        var ind = description.indexOf("$");
        if (ind != -1) {
          var counter = ind + 1;

          // find the end of the cost
          while ((0 <= +description.charAt(counter)) && (+description.charAt(counter) <= 9)) {
            counter++;
          }

          cost = description.substring(ind + 1, counter);
          console.log(cost);
        }

        var keys = description.split(" ", 100);
        var mySet = new Set();


        // var splitted = time.split(" ", 5);







        // parse and add the event GENRE

        // set default report value to ZERO
        //this.eventToAdd.report = 0;

        //this.dal.addToList(this.eventToAdd);

      }
      resolve();
     })
    }).then(() => {
      //Add everything from the list to the database
    });
  }

  ngOnInit(){

  }

}
