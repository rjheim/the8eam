import {Event} from '../event';
import {rss} from 'rss-to-json/src/rss';
import * as rssGet from 'rss-to-json';
import {Parser} from "./functions";

export class Isthmus {
  parse = new Parser();

  getIsthmusEvents() : Array<Event>{
    let that = this;
    //var proxy = 'https://cors-anywhere.herokuapp.com/'
    let eventsToAdd : Array<Event> = [];

    rssGet.load('https://isthmus.com/search/event/calendar-of-events/index.rss', function (err, rss) {
      // get the specific items (go one layer down)
      let items = rss["items"];
      let list: Array<Event> = [];
      return new Promise((resolve, reject) => {
        let mySet = new Set();


        for (var key in items) {

          var eventToAdd = {} as Event;
          let toAdd: boolean = true;

          var title = items[key]["title"];
          var titleIndex = title.indexOf(" - ");


          var timeIndex = title.indexOf(" @ ");
          if (timeIndex == -1) {
            timeIndex = title.length;
          }

          // parse in the event NAME
          var eventName = title.substring(0, titleIndex);
          eventToAdd.title = eventName;










          // parse the event TIME
          var time = title.substring(titleIndex + 3, timeIndex);

          var splitted = time.split(" ", 5);

          var tempDate = that.parse.date(splitted);

          eventToAdd.time = "" + that.parse.timeFunc(splitted);
          var timeStr = "" + eventToAdd.time;
          var fullDate = "" + tempDate + timeStr;



          eventToAdd.date = +fullDate;


          // new Date(year, month, day, hours, minutes, seconds, milliseconds)
          // EXAMPLE ["Dec", "6,", "2017", "8:00", "PM"]
          // DATE example 201712061630
          var year = splitted[2];
          var month = splitted[0];
          var tempNum = "" + eventToAdd.date;
          var numMonth = tempNum.substring(4,6);
          var day = tempNum.substring(6, 8);
          var hour = tempNum.substring(8, 10);
          var minute = tempNum.substring(10, 12);

          var date = new Date(year, +numMonth - 1, +day, +hour, +minute, 0, 0);

          var getDate = date.toString();

          // obj example Wed Dec 06 2017 19:15:00 GMT-0600 (CST)

          var full = getDate.split(" ");

          // todo CHANGE TO BE DYNAMIC
          eventToAdd.time = full[0] + ", " + full[1] + " " + full[2] + ", " + full[3] + " at " + splitted[3] + splitted[4];

          // parse and add the LOCATION
          eventToAdd.location = that.parse.location(title.substring(timeIndex + 3))


          // parse and add the event DESCRIPTION
          var description = items[key]["description"];
          eventToAdd.description = description;

          // parse and add the event LINK
          var link = items[key]["link"];
          eventToAdd.link = link;

          // parse and add the event COST
          eventToAdd.cost = +that.parse.cost(description);



          // ADD CATEGORIES HERE
          description = description.toUpperCase();
          eventName = eventName.toUpperCase();

          eventToAdd.genre = that.parse.categorizer(description, eventName);

          if(eventToAdd.genre == "" || eventToAdd.genre == "family;"){
            toAdd = false;
          }


          // set default report value to ZERO
          eventToAdd.report = 0;

          if(toAdd) {
            if (list.indexOf(eventToAdd) == -1) {

              list.push(eventToAdd);
            }
          }

        }
        resolve(list);
      });
    }).then(function(list){
      eventsToAdd = list;
    });

    return eventsToAdd;
  }
}
