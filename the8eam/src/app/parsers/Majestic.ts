import {Event} from '../event';
import {rss} from 'rss-to-json/src/rss';
import * as rssGet from 'rss-to-json';
import {Parser} from "./functions";
import * as ical from 'ical';
import GoogleDistanceMatrix from 'google-distance-matrix';

export class Majestic {
  parse = new Parser();

  formatMajesticTime(time){
    let arr = time.split(" ");
    let start = arr[4].split(":");
    let timeOfDay;
    if(start[0] > 11 && start[0] < 24) {
      timeOfDay = "PM"
      if (start[0] != 12) {
        start[0] = start[0]-12;
      }
    }   else {
      timeOfDay = "AM"   }

    return arr[0] + ", " + arr[1] + " " + arr[2] + ", " + arr[3] + " at " + start[0] + ":" + start[1] + timeOfDay;
  }


  formatMajesticDate(time){
    let year = time.getFullYear();
    let date = time.getDate();
    if (date < 10) {
      date = "0" + date;   }
    let month = time.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;   }
    let hour = time.getHours();
    if (hour < 10) {
      hour = "0" + hour;   }
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;   }
    let fullDate = "" + year + month + date + hour + minutes;    return fullDate;
  }



  testiCal(adder) {
    let list: Array<Event> = [];
    let toAdd: boolean = true;
    let that = this;

    let proxy = 'https://cors-anywhere.herokuapp.com/'
    ical.fromURL(proxy + 'http://majesticmadison.com/events/?ical=1&amp;tribe_display=list', {}, function(err, events) {


        for (let event in events) {
          let eventToAdd = {} as Event;
          eventToAdd.title = events[event].summary;

          eventToAdd.date = +that.formatMajesticDate(events[event].start);

          eventToAdd.description = events[event].description

          eventToAdd.genre = that.parse.categorizer(eventToAdd.description, eventToAdd.title);

          eventToAdd.link = events[event].url;

          //eventToAdd.location = ical[event].location;

          let parseLocation = events[event].location;
          eventToAdd.location = parseLocation;
          let origins = [ parseLocation ];
          let destinations = [ '66 W Towne Mall, Madison, WI 53719', '1308 W Dayton St, Madison, WI 53715',
            '800 Langdon St, Madison, WI 53706', '2 E Main St, Madison, WI 53703',
            '1414 E Johnson St, Madison, WI 53703', '89 E Towne Mall, Madison, WI 53704'];
          let distData: number [] = [];
          GoogleDistanceMatrix.matrix(origins, destinations, function (err, distances) {
            if (err) {
              return console.log(err);
            }
            if (!distances) {
              return console.log('no distances');
            }
            if (distances.status == 'OK') {
              for (let j = 0; j < destinations.length; j++) {
                let distance = -1;
                if (distances.rows[0].elements[j].status == 'OK') {
                  let distanceInit = distances.rows[0].elements[j].distance.text;
                  if (distanceInit.indexOf("ft") != -1) {
                    distance = (parseFloat(distanceInit) / 5280);
                  }
                  else {
                    distance = parseFloat(distanceInit);
                  }
                } else {
                  distance = -1;
                }
                distData.push(distance);
              }
            }
            if ((distData[0] == distData[3]) || distData[0]>50) {
              console.log("in if");
              distData = [];
              parseLocation = parseLocation + ', WI';
              origins = [parseLocation];
              GoogleDistanceMatrix.matrix(origins, destinations, function (err, distances) {
                if (err) {
                  return console.log(err);
                }
                if (!distances) {
                  return console.log('no distances');
                }
                if (distances.status == 'OK') {
                  for (let j = 0; j < destinations.length; j++) {
                    let distance = -1;
                    if (distances.rows[0].elements[j].status == 'OK') {
                      let distanceInit = distances.rows[0].elements[j].distance.text;
                      if (distanceInit.indexOf("ft") != -1) {
                        distance = (parseFloat(distanceInit) / 5280);
                      }
                      else {
                        distance = parseFloat(distanceInit);
                      }
                    } else {
                      distance = -1;
                    }
                    distData.push(distance);
                  }
                }
                eventToAdd.locDist = distData;
                console.log(parseLocation);
                console.log(distData);
              });
            }
            else {
              eventToAdd.locDist = distData;
              console.log(parseLocation);
              console.log(distData);
            }
          });

          eventToAdd.report = 0;

          eventToAdd.time = that.formatMajesticTime(events[event].start.toString());

          if (eventToAdd.genre == "" || eventToAdd.genre == "family") {
            eventToAdd.genre = "music;"
          }

          //if (toAdd) {

          list.push(eventToAdd);
          //console.log(eventToAdd);
          //}
        }

        adder(list);
    })

  }
}
