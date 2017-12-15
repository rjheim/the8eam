import {Event} from '../event';
import {rss} from 'rss-to-json/src/rss';
import * as rssGet from 'rss-to-json';
import {Parser} from "./functions";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import GoogleDistanceMatrix from 'google-distance-matrix';

export class UW {

  parse = new Parser();

  getUWEvents(adder) {
    let that = this;
    let proxy = 'https://cors-anywhere.herokuapp.com/'

    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth();
    month = month + 1;
    let year = today.getFullYear();
    let eventsToAdd : Array<Event> = [];

    for (let i = day; i <= 31; i++) {
      let url : string;
      if (i >= 10) {
        url = "https://today.wisc.edu/events/day/" + year + "-" + month + "-" + i + ".rss2";
      }
      if (i < 10) {
        url = "https://today.wisc.edu/events/day/" + year + "-" + month + "-0" + i + ".rss2";
      }

      rssGet.load(proxy + url, function (err, rss) {
        // get the specific items (go one layer down)
        let items = rss["items"];
        //console.log(items);

        let list: Array<Event> = [];


          for (let key in items) {
            let title, time, titleIndex, eventName, dateString, description, timeDenoter, costIndex, endLink, iAM, iPM, iColon;
            let eventToAdd = {} as Event;
            let toAdd: boolean = true;

            title = items[key]["title"];
            titleIndex = title.indexOf(" - ");


            // parse in the event NAME
            eventName = title.substring(titleIndex + 3);
            eventToAdd.title = eventName;


            // parse date
            dateString = title.substring(0, titleIndex).split(" ", 5) ;


            // parse and add the event DESCRIPTION
            description = items[key]["description"];
            timeDenoter = description.indexOf("Information:");

            costIndex = description.indexOf("Cost:");

            endLink = description.indexOf("a>.");

            iAM = description.indexOf("a.m.");
            iPM = description.indexOf("p.m.");

            iColon = description.indexOf(":");


            eventToAdd.description = description;



            /*** --------Date-------- ***/
            if (endLink != -1) {

              // has information, no cost
              if (timeDenoter != -1 && costIndex == -1) {
                time = description.substring(endLink + 4, timeDenoter);

                eventToAdd.time = "" + that.parseUWTime(time);
              }
              // has information, has cost
              else if (timeDenoter != -1 && costIndex != -1) {
                time = description.substring(endLink + 4, costIndex);

                eventToAdd.time = "" + that.parseUWTime(time);
              }
              // no information, has cost
              else if (timeDenoter == -1 && costIndex != -1) {
                time = description.substring(endLink + 4, costIndex);

                eventToAdd.time = "" + that.parseUWTime(time);
              }
              // no information, no cost
              else if (timeDenoter != -1 && costIndex != -1) {
                time = description.substring(endLink + 4, description.length - 1);

                eventToAdd.time = "" + that.parseUWTime(time);
              }

              else if (iAM == -1 && iPM == -1) {
                time = "0000";

                eventToAdd.time = time;
              }
            }
            else {

              // has am, with or without pm
              if (iAM != -1 && iColon == -1) {
                time = description.substring(iAM - 3, iAM + 4);

                eventToAdd.time = "" + that.parseUWTime(time);
              }
              else if (iAM != -1 && iColon != -1) {
                time = description.substring(iAM - 6, iAM + 4);

                eventToAdd.time = "" + that.parseUWTime(time);
              }
              // no am, has pm
              else if (iAM == -1 && iPM != -1 && iColon == -1) {
                time = description.substring(iPM - 3, iPM + 4);

                eventToAdd.time = "" + that.parseUWTime(time);
              }
              else if (iAM == -1 && iPM != -1 && iColon != -1) {
                time = description.substring(iPM - 6, iPM + 4);

                eventToAdd.time = "" + that.parseUWTime(time);
              }
              // no am , no pm
              else if (iAM == -1 && iPM == -1) {
                time = "0000";

                eventToAdd.time = time;
              }
            }
            if (isUndefined(eventToAdd.time)) {
              eventToAdd.time = "9999";
            }
            //console.log("time below");
            //console.log(eventToAdd.time);
            let fullTime = "" + eventToAdd.time;
            if (+eventToAdd.time < 1000 && eventToAdd.time != "0" && eventToAdd.time != "0000") {
              fullTime = "0" + fullTime;

            } else if (+eventToAdd.time < 1000 && eventToAdd.time == "0") {

              fullTime = "000" + fullTime;
            }


            fullTime = "" + that.parse.date(dateString) + fullTime;
            //console.log(fullTime);
            eventToAdd.date = +fullTime;

            /*** --------Date As String-------- ***/


            let toParse = "" + eventToAdd.date;
            let year = toParse.substring(0, 4);
            let month = toParse.substring(4, 6);
            let day = toParse.substring(6, 8);

            let hour = toParse.substring(8, 10);
            let minute = toParse.substring(10, 12);
            if(hour == '99'){
              hour = null;
              minute = null
            }



            let meridiem = "AM"

            if (+hour > 11) {
              let temp = +hour - 12;
              hour = "0" + temp;
              meridiem = "PM";
            }

            // new Date(year, month, day, hours, minutes, seconds, milliseconds)
            let date : Date;
            if(!hour) date = new Date(+year, (+month - 1), +day);
            else date = new Date(+year, (+month - 1), +day, +hour, +minute, 0, 0);

            let testString = date.toString();

            // EXAMPLE “Wed, Dec 27 2017 at 12:37PM”
            // EXAMPLE OBJECT Sat Dec 30 2017 00:00:00 GMT-0600 (CST)
            //if(testString == "Invalid Date") console.log(eventToAdd.date);

            let objSplit = testString.split(" ");

            //console.log(objSplit);

            let dayOfWeek = objSplit[0];
            let monthVal = objSplit[1];
            let dayNum = objSplit[2];
            let yearNum = objSplit[3];

            let timeNum = objSplit[4];

            timeNum = timeNum.substring(0, 5);

            if (meridiem) {

              timeNum = timeNum + "PM ";

            } else {
              timeNum = timeNum + "AM ";
            }

            if (timeNum[0] == "0") {
              timeNum = timeNum.substring(1, timeNum.length);
            }
            //console.log(timeNum);
            if (timeNum.substring(0, 4) == "0:00") {
              timeNum = "midnight";
            }

            eventToAdd.time = dayOfWeek + ", " + monthVal + " " + dayNum + " " + yearNum + " at " + timeNum;

            /*** --------COST-------- ***/

            eventToAdd.cost = -1;

            // if "Free" follows "Cost:"
            if (costIndex == -1 || (description.indexOf("Free") <= costIndex + 8 && description.indexOf("Free") != -1) ||
              (description.indexOf("free") <= costIndex + 8 && description.indexOf("free") != -1) ||
              (description.indexOf("FREE") <= costIndex + 8 && description.indexOf("FREE") != -1)) {

              eventToAdd.cost = 0;
            }

            // has "Information"
            else if (costIndex != -1 && timeDenoter != -1) {
              let cost = description.substring(costIndex + 6, timeDenoter);

              eventToAdd.cost = parseInt(cost.substring(1, cost.length));
            }
            // no "Information
            else if (costIndex != -1 && timeDenoter == -1) {
              let cost = description.substring(costIndex + 6, description.length - 1);
              eventToAdd.cost = parseInt(cost.substring(1, cost.length));
            }


            // parse and add the event LINK
            let link = items[key]["link"];
            eventToAdd.link = link;

            // parse and add the event COST

            let parseLocation: string;
            if (description.indexOf("<a href") != -1) {
              for (var i = description.indexOf("</"); i > 0; i--) {
                if (description.charAt(i) == '>') {
                  //console.log(description.substring(i + 1, description.indexOf("</")));
                  parseLocation = description.substring(i + 1, description.indexOf("</"));
                  var toReplace = description.substring(description.indexOf("<a"), description.indexOf("a>") + 2);

                  eventToAdd.description = description.replace(toReplace, parseLocation);
                  //console.log(eventToAdd.description);
                }

              }
            }
            else {
              let rawlocation;
              let betterlocation;
              if(iAM != -1) {
                rawlocation = description.substring(iAM - 30, iAM);
                betterlocation = that.UWlocationCornercase(rawlocation);
                //console.log("Raw location " + betterlocation);
                parseLocation = rawlocation;
              }
              else if(iAM == -1 && iPM != -1)
              {
                rawlocation = description.substring(iPM - 30, iPM);
                betterlocation = that.UWlocationCornercase(rawlocation);
                //console.log("Raw location " + betterlocation);
                parseLocation = rawlocation;
              }
            }
            eventToAdd.location = parseLocation;

            // UW distance formula

            if (parseLocation.indexOf('Memorial') != -1){
              parseLocation = '800 Langdon St, Madison, WI 53706';
            }
            if (parseLocation.indexOf('Natatorium') != -1){
              parseLocation = '2000 Observatory Dr, Madison, WI 53706';
            }
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
                    if (distanceInit.indexOf("ft") != -1){
                      distance = (parseFloat(distanceInit)/5280);
                    }
                    else{
                      distance = parseFloat(distanceInit);
                    }
                  } else {
                    distance = -1;
                  }
                  distData.push(distance);
                }
              }
              console.log(parseLocation);
              console.log(distData);
              eventToAdd.locDist = distData;
            });

            // ADD CATEGORIES HERE
            description = description.toUpperCase();
            eventName = eventName.toUpperCase();

            eventToAdd.genre = that.parse.categorizer(description, eventName);

            if (eventToAdd.genre == "" || eventToAdd.genre == "family;") {
              toAdd = false;
            }


            // set default report value to ZERO
            eventToAdd.report = 0;

            if (eventToAdd.genre == "" || eventToAdd.genre == "family;") {

            } else {
              if (list.indexOf(eventToAdd) == -1) {
                if (!isNaN(eventToAdd.date)) {
                  //console.log(eventToAdd);
                  list.push(eventToAdd);
                }
              }
            }

            //console.log(list);
          }
          adder(list);
            //console.log(eventsToAdd);

      });
    }
  }

  parseUWTime(rawString : string) : number {
    // Default time i.e. no time
    if(typeof rawString === 'undefined' || !rawString){
      console.log("invalid time");
      return 9999;
    }

    let splitChars = [];
    let rawresultString = "";
    let chari = "";

    let delicateresultString = "";
    let time = 0;

    // Check for keywords first
    if (rawString.toUpperCase().includes("MIDNIGHT")) {
      time = 0;
      return time;
    }
    else if (rawString.toUpperCase().includes("NOON")) {
      time = 1200;
      return time;
    }

    for (let i = 0; i < rawString.length; ++i) {
      chari = "" + rawString.charAt(i);

      splitChars.push(chari);

    }

    for (let i = 0; i < splitChars.length; ++i) {
      if (splitChars[i] == "0" || splitChars[i] == "1" || splitChars[i] == "2" || splitChars[i] == "3" ||
        splitChars[i] == "4" || splitChars[i] == "5" || splitChars[i] == "6" || splitChars[i] == "7" ||
        splitChars[i] == "8" || splitChars[i] == "9" || splitChars[i] == "-") {
        rawresultString = rawresultString + splitChars[i];
      }
      else {
        splitChars[i] = "|";
      }
    }


    if (rawresultString.indexOf("-") != -1) {
      delicateresultString = rawresultString.substring(0, rawresultString.indexOf("-"));
    }
    else {
      delicateresultString = rawresultString;
    }

    if (delicateresultString.length == 1) {
      time = parseInt(delicateresultString);
      time = time * 100;
    }

    else if (delicateresultString.length == 3) {
      time = parseInt(delicateresultString);
    }


    if (rawString.includes("p.m.")) {
      time = time + 1200;
    }

    //console.log("time");
    //console.log(time);
    // Check if we ended up with a valid time/number
    if( !time ){
      console.log("invalid time");
      time = 9999;
    }

    return time;

  }

  UWlocationCornercase(rawlocation) {
    let firstRound = rawlocation.substring(rawlocation.indexOf(".") + 2);
    return firstRound.substring(0,firstRound.indexOf("."));
  }
}
