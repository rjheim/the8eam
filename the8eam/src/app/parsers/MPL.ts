import {Event} from '../event';
import {rss} from 'rss-to-json/src/rss';
import * as rssGet from 'rss-to-json';
import {Parser} from "./functions";

export class MPL {
  parse = new Parser();

  getMPLEvents(adder){
    let that = this;
    //var proxy = 'https://cors-anywhere.herokuapp.com/'
    let eventsToAdd : Array<Event> = [];

    rssGet.load('http://host.evanced.info/madison/evanced/eventsxml.asp?lib=ALL&nd=30&feedtitle=Madison+Public+Library+Events&dm=rss2&LangType=0', function (err, rss) {
      // get the specific items (go one layer down)
      let items = rss["items"];
      let list: Array<Event> = [];

      let mySet = new Set();


      for (let i = 0; i < 150; i++) {
        //console.log(items[i]);
        let eventToAdd = {} as Event;
        let toAdd: boolean = true;

        // let title = items[i]["title"];
        // let titleIndex = title.indexOf(" - ");
        //
        //
        // let timeIndex = title.indexOf(" @ ");
        // if (timeIndex == -1) {
        //   timeIndex = title.length;
        // }



        // parse in the event NAME

        eventToAdd.title = items[i]["title"];

        let description = items[i]["description"];
        //console.log(description);

        // DATE EXAMPLE
        // EXAMPLE ["Dec", "6,", "2017", "8:00", "PM"]

        // <b>When:</b> Tuesday, December 19, 2017 - 4:00 PM - 5:00 PM<br><b>Where:</b> Lakeview Library at Community Room - Fireplace Side<br><br>Join other LEGO fans and build your own unique creation!<br />Note: LEGOs are the featured Terrific Tuesday activity for today.
        let chopped = description.split(" ");

        let dayOfWeek = chopped[1];
        dayOfWeek = dayOfWeek.substring(0, dayOfWeek.length - 1);
        let month = chopped[2];
        let day = chopped[3];
        day = day.substring(0, day.length - 1);
        let year = chopped[4];
        let time = chopped[6];
        let ampm = chopped[7];

        // parse the event TIME

        let arr = [month, day, year, time, ampm];

        let tempDate = that.parse.date(arr);

        eventToAdd.time = "" + that.parse.timeFunc(arr);
        let timeStr = "" + eventToAdd.time;
        let fullDate = "" + tempDate + timeStr;



        eventToAdd.date = +fullDate;

        // TIME EXAMPLE
        // [ "Dec", "6,", "2017", "12:00", "PM" ]
        // new Date(year, month, day, hours, minutes, seconds, milliseconds)
        // EXAMPLE ["Dec", "6,", "2017", "8:00", "PM"]
        // DATE example 201712061630
        let tempNum = "" + eventToAdd.date;
        let numMonth = tempNum.substring(4,6);
        let hour = tempNum.substring(8, 10);
        let minute = tempNum.substring(10, 12);

        let date = new Date(year, +numMonth - 1, +day, +hour, +minute, 0, 0);

        let getDate = date.toString();

        // obj example Wed Dec 06 2017 19:15:00 GMT-0600 (CST)

        let full = getDate.split(" ");

        // todo CHANGE TO BE DYNAMIC
        eventToAdd.time = full[0] + ", " + full[1] + " " + full[2] + ", " + full[3] + " at " + time + ampm;



      let locbr = "Where";

      let start = description.indexOf(locbr);
      //console.log(description.substring(start));
      let end = start + 10;
      while (description.charAt(end) != '<') {
        end++;
      }
      eventToAdd.location = description.substring(start + 10, end);








        // parse and add the LOCATION
        //eventToAdd.location = that.parse.location(title.substring(timeIndex + 3))


        let bold = '<b';
        let endBold = '</b';
        let br = '<br';
        let endbr = '<br /';

        bold = bold + '>';
        endBold = endBold + '>';
        br = br + '>';
        endbr = endbr + '>';

        while (description.indexOf(bold) != -1) {
          description = description.replace(bold, ' ');
        }

        while (description.indexOf(endBold) != -1) {
          description = description.replace(endBold, '');
        }

        while (description.indexOf(br) != -1) {
          description = description.replace(br, '');
        }

        while (description.indexOf(endbr) != -1) {
          description = description.replace(endbr, '');
        }











        // parse and add the event DESCRIPTION


        eventToAdd.description = description;

        // parse and add the event LINK
        let link = items[i]["link"];
        eventToAdd.link = link;

        // parse and add the event COST
        eventToAdd.cost = +that.parse.cost(description);



        // ADD CATEGORIES HERE
        description = description.toUpperCase();
        let title = eventToAdd.title.toUpperCase();

        eventToAdd.genre = that.parse.categorizer(description, title);

        if(eventToAdd.genre == "" || eventToAdd.genre == "family;"){
          toAdd = false;
        }


        // set default report value to ZERO
        eventToAdd.report = 0;
        console.log(eventToAdd);
        if(toAdd) {
          if (list.indexOf(eventToAdd) == -1) {

            list.push(eventToAdd);
          }
        }

      }
      adder(list);
    });
  }
}
