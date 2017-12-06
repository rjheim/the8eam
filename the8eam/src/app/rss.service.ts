import {Injectable} from '@angular/core';
//import { DataAccessLayerService } from '../data-access-layer.service';
import {Event} from './event';
import {rss} from 'rss-to-json/src/rss';
import * as parser1 from 'xml2js';
import {request} from 'request';
import * as rssGet from 'rss-to-json'
import {Observable} from 'rxjs/Observable';
import * as ical from 'ical';
import { DataAccessLayerService } from './data-access-layer.service';
import {timeInterval} from "rxjs/operator/timeInterval";
import {isDefined} from "@angular/compiler/src/util";
//import * as parser from 'xml2js-parser';
//import * as iCal from 'node-ical';
//import * as converter from 'ical2json';

// rssGet = require('rss-to-json');
// ALL OF THE SETS WE WILL BE COMPARING DESCRIPTIONS TO
var musicArray = ["MUSIC", "SONG", "SINGING", "JAZZ", "ROCK", "PIANO", "GUITAR", "DRUMS", "CONCERT", "SING-ALONG", "MIC", "SOUL", "AMERICANA", "RAP", "RAPPER", "SINGER", "POP", "BLUES", "FOLK", "HIP", "COUNTRY", "ELECTRONIC", "RAVE", "REGGAE", "CLASSICAL", "PUNK", "FUNK", "RHYTHM", "TECHNO", "DISCO", "METAL", "DUBSTEP", "OPERA"];
let musicSet: Set<string> = new Set<string>(musicArray);

var literaryArray = ["WORD", "SLAM", "POETRY", "POET", "LITERATURE", "BOOK", "BOOKS", "WRITE", "WRITING", "NOVEL", "WRITER", "AUTHOR", "READING", "SIGNING", "READ"];
let literarySet: Set<string> = new Set<string>(literaryArray);

var artArray = ["ARCHITECTURE", "CERAMICS", "COLLAGE", "DESIGN", "DRAWING", " CHALK", "CHARCOAL", "PASTEL", "GRAFFITI", "GRAPHIC", "GRAPHICS", "ILLUSTRATION", "JEWELLERY", "METALWORK", "MOSAIC", "PAINT", "PAINTING", "PAINTER", "ART", "ARTIST", "ACRYLICS", "OILS", "OIL", "PHOTO", "PHOTOGRAPHY", "PRINT", "ENGRAVING", "SCULPTURE", "STAINED GLASS", "TAPESTRY", "ABSTRACT", "PORTRAIT", "LANDSCAPE", "IMPRESSIONISM", "POST-IMPRESSIONISM", "CUBISM", "SURREALISM"];
let artSet: Set<string> = new Set<string>(artArray);

var danceArray = ["WALTZ", "TANGO", "CHACHA", "CHA-CHA", "RUMBA", "SAMBA", "MAMBO", "QUICKSTEP", "JIVE", "BOLERO", "CHARLESTON", "SWING", "TAP", "BOOGIE", "SALSA", "FLAMENCO", "LAMBADA", "POLKA", "JIVE", "CAPOERIA", "LINE DACE", "BELLY DANCE", "FOLK DANCE", "BALLET", "CONTEMPORARY", "MODERN", "DISCO", "BOLLYWOOD", "BREAKDANCE", "BALLROOM", "IRISH", "HUSTLE", "JITTERBUG", "FOXTROT", "MERENGUE", "ZUMBA", "POLE DANCE", "DANCE"];
let danceSet: Set<string> = new Set<string>(danceArray);

var foodArray = ["MARKET", "BREAKFAST", "BRUNCH", "LUNCH", "TEA", "DINNER", "SUPPER", "SNACK", "MEAL", "DESSERT", "HORS", "D’OEUVRE", "ENTREE", "SIDE", "BANQUET", "BUFFET", "CUISINE", "DRINK", "EAT", "EATING", "VEGAN", "VEGETARIAN", "ITALIAN", "SEAFOOD", "MEXICAN", "VIETNAMESE", "THAI", "SAUSAGE", "BARBECUE", "BARBEQUE", "BBQ", "SUSHI", "HOT DOG", "BURGER", "STEAK", "MEDITERRANEAN", "PERUVIAN", "GREEK", "BRAZILIAN", "ASIAN", "SOUL FOOD", "DONUT", "DOUGHNUT", "BEER", "ICE", "KOREAN", "FOOD TRUCK", "TAPAS", "TACO", "TASTE", "SIP", "MUNCH", "RESTAURANT", "BAR", "DINER"];
let foodSet: Set<string> = new Set<string>(foodArray);

var familyArray = ["DAYCARE","KID", "KIDS", "CHILD", "PARENTAL","PARENT", "MOM","DAD", "CHILDREN","LEGO", "PARENTS","MOTHER","FATHER", "CARE", "KINDERGARTEN","ELEMENTARY", "SCHOOL", "MIDDLE","TOY", "PLAYGROUND", "FAMILY", "FAMILIES"]
let familySet: Set<string> = new Set<string>(familyArray);

var theaterArray = ["STAGE", "DRAMA", "MUSICAL", "SHAKESPEARE", "THEATRICAL", "ACT", "ACTING", "ACTRESS", "COMEDY", "TRAGEDY", "ACTORS", "OPERA", "PLAY"]
let theaterSet: Set<string> = new Set<string>(theaterArray);

var filmArray = ["MOVIE", "FILM", "ACTRESS","FILMING", "ACTOR","ACTORS","ACTRESSES", "ACTION","ADVENTURE","COMEDY","THRILLER", "DRAMA","HOLLYWOOD","BOLLYWOOD","DIRECTOR","TRAILER", "CINEMA","CARTOON","ANIME","SOUNDTRACK","COSTUME","DOCUDRAMA","DOCUMENTARY","FILMSTRIP"]
let filmSet: Set<string> = new Set<string>(filmArray);


@Injectable()
export class RssService {
  dupObserve: Observable<Event[]>;

  constructor(private dal: DataAccessLayerService) {

  }

  testRSS() {
    //this.getIsthmusEvents();
    //this.getUWEvents();
    //this.testiCal();


  }

  // DATE FUNCTION
  // EXAMPLE ["Dec", "6,", "2017", "8:00", "PM"]
  date(splitted) {
    // month
    let month = '';
    let day = '';
    switch (splitted[0]) {
      case 'Jan':
        month = '01';
        break;
      case 'January':
        month = '01';
        break;
      case 'Feb':
        month = '02';
        break;
      case 'February':
        month = '02';
        break;
      case 'Mar':
        month = '03';
        break;
      case 'March':
        month = '03';
        break;
      case 'Apr':
        month = '04';
        break;
      case 'April':
        month = '04';
        break;
      case 'May':
        month = '05';
        break;
      case 'Jun':
        month = '06';
        break;
      case 'June':
        month = '06';
        break;
      case 'Jul':
        month = '07';
        break;
      case 'July':
        month = '07';
        break;
      case 'Aug':
        month = '08';
        break;
      case 'August':
        month = '08';
        break;
      case 'Sep':
        month = '09';
        break;
      case 'September':
        month = '09';
        break;
      case 'Oct':
        month = '10';
        break;
      case 'October':
        month = '10';
        break;
      case 'Nov':
        month = '11';
        break;
      case 'November':
        month = '11';
        break;
      case  'December':
        month = '12';
        break;
      case "Dec":
        month = '12';
        break;
      default:
        break;
    }
    if (splitted[1].charAt(splitted[1].length) == ",") {

      day = splitted[1].substring(0,splitted[1].length - 1);
    }
    else {
      day = `0` + splitted[1].substr(0, 1);
    }

    // year
    var year = 2017;
    var date = "" + year + month + day;
    return +date;
  }

  /*
    *** TIME FUNCTION ***
    *                0      1     2       3        4
    * splitted ex: [ "Dec", "6,", "2017", "12:00", "PM" ]
   */
  timeFunc(splitted) {
    let specTime : string;
    let isMorn : boolean;
    let hour, minute, timeSplit;

    // CHECK TO MAKE SURE THERE IS A TIME
    if (splitted[3]) {

      // TIME
      specTime = "" + splitted[3]; //Cast to string just in case splitted[3] is only numbers
      isMorn = false;

      if (splitted[4] == "AM") {
        isMorn = true;
      }

      // for the hour, then minute
      timeSplit = specTime.split(':', 2);

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

    return specTime;
  }
  parseUWTime(rawString){

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
    else if(rawString.toUpperCase().includes("NOON")) {
      time = 1200;
      return time;
    }

    for(let i = 0; i < rawString.length; ++i)
    {
        chari = "" + rawString.charAt(i);

        splitChars.push(chari);

    }

    for(let i = 0; i < splitChars.length; ++i)
    {
      if(splitChars[i] == "0" || splitChars[i] == "1" || splitChars[i] == "2" || splitChars[i] == "3" ||
        splitChars[i] == "4" || splitChars[i] == "5" || splitChars[i] == "6" || splitChars[i] == "7" ||
        splitChars[i] == "8" || splitChars[i] == "9" || splitChars[i] == "-")
      {
        rawresultString = rawresultString + splitChars[i];
      }
      else {
        splitChars[i] = "|";
      }
    }



    if(rawresultString.indexOf("-") != -1)
    {
      delicateresultString = rawresultString.substring(0, rawresultString.indexOf("-"));
    }
    else{
      delicateresultString = rawresultString;
    }

    if(delicateresultString.length == 1)
    {
      time = parseInt(delicateresultString);
      time = time * 100;
    }

    else if (delicateresultString.length == 3)
    {
      time = parseInt(delicateresultString);
    }


    if(rawString.includes("p.m."))
    {
      time = time + 1200;
    }

    return time;

  }

  // LOCATION FUNCTION

  location(toReturn) {
    if (toReturn.length < 1) {
      toReturn = "See description.";
    }
    return toReturn;
  }

  // COST FUNCTION

  cost(description) {
    var cost = 0;
    var free = description.toLowerCase().indexOf("free");
    if (free != -1) {
    }

    var ind = description.indexOf("$");
    if (ind != -1) {
      var counter = ind + 1;

      // find the end of the cost
      while ((0 <= +description.charAt(counter)) && (+description.charAt(counter) <= 9)) {
        counter++;
      }

      cost = description.substring(ind + 1, counter);

    }
    return cost;
  }

  categorizer(description, eventName) {


    let music: number = 0;
    let literary: number = 0;
    let dance: number = 0;
    let food: number = 0;
    let art: number = 0;
    let family: number = 0;
    let film: number = 0;
    let theater: number = 0;

    var descr = description.split(" ");

    for (var inds in descr) {
      var word = descr[inds];
      //remove beginning and end punctuation
      if (word.endsWith('.') || word.endsWith('?') || word.endsWith('!') || word.endsWith(',') || word.endsWith(';') ||
        word.endsWith(':') || word.endsWith('\'') || word.endsWith('\"')) {
        word = word.substr(0, word.length - 1);
      }

      if (word.startsWith('\"') || word.startsWith('\'')) {
        word = word.substr(1);
      }

      // make the word capitalized to match our sets
      word = word.toUpperCase();



      if (musicSet.has(word)) {
        ++music;
      }

      if (literarySet.has(word)) {
        ++literary;
      }


      if (foodSet.has(word)) {
        ++food;
      }


      if (artSet.has(word)) {
        ++art;
      }


      if (danceSet.has(word)) {
        ++dance;
      }

      // CHECK FAMILY SET
      if (familySet.has(word)) {
        ++family;
      }

      // CHECK THEATER SET
      if (theaterSet.has(word)) {
        ++theater;
      }

      // CHECK FILM SET
      if (filmSet.has(word)) {
        ++film;
      }

    }

    var genres = "";

    if (music > 0) {
      genres = genres + "music;";
      //eventToAdd.genre.push("music");
    }

    if (literary > 0) {
      genres = genres + "literature;";
      //eventToAdd.genre.push("spoken word");
    }

    if (dance > 0) {
      genres = genres + "dance;";
      //eventToAdd.genre.push("dance");
    }

    if (art > 0) {
      genres = genres + "art;";
      //eventToAdd.genre.push("art");
    }

    if (food > 0) {
      genres = genres + "food;";
      //eventToAdd.genre.push("food");
    }

    if (family > 0) {
      genres = genres + "family;"
    }

    if (theater > 0) {
      genres = genres + "theater;"
    }

    if (film > 0) {
      genres = genres + "film;"
    }
    return genres;
  }

  getUWEvents() {
    var that = this;
    var proxy = 'https://cors-anywhere.herokuapp.com/'

    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth();
    month = month + 1;
    var year = today.getFullYear();

    for (var i = day; i <= 31; i++) {
        if (i >= 10) {
          var url = "https://today.wisc.edu/events/day/" + year + "-" + month + "-" + i + ".rss2";
        }

        if (i < 10) {
          var url = "https://today.wisc.edu/events/day/" + year + "-" + month + "-0" + i + ".rss2";
        }

        rssGet.load(proxy + url, function (err, rss) {
          // get the specific items (go one layer down)
          let items = rss["items"];
          let list: Array<Event> = [];
          let promise = new Promise((resolve, reject) => {


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



              /* Parse Time */
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



              var fullTime = "" + eventToAdd.time;
              if (+eventToAdd.time < 1000 && eventToAdd.time != "0" && eventToAdd.time != "0000") {
                fullTime = "0" + fullTime;

              } else if (+eventToAdd.time < 1000 && eventToAdd.time == "0") {

                fullTime = "000" + fullTime;
              }


              fullTime = "" + that.date(dateString) + fullTime;
              eventToAdd.date = +fullTime;

              // TIME TO CONSTRUCT THE TIME AS A STRING

              var strTime = "";

              var toParse = "" + eventToAdd.date;
              var year = toParse.substring(0, 4);
              var month = toParse.substring(4, 6);
              var day = toParse.substring(6, 8);

              var hour = toParse.substring(8, 10);
              var minute = toParse.substring(10, 12);




              var after = "AM"

              if (+hour > 11) {
                var temp = +hour - 12;
                hour = "0" + temp;
                after = "PM";
              }

              // new Date(year, month, day, hours, minutes, seconds, milliseconds)
              var date = new Date(+year, (+month - 1), +day, +hour, +minute, 0, 0);

              var testString = date.toString();

              // EXAMPLE “Wed, Dec 27 2017 at 12:37PM”
              // EXAMPLE OBJECT Sat Dec 30 2017 00:00:00 GMT-0600 (CST)

              var objSplit = testString.split(" ");
              var dayOfWeek = objSplit[0];
              var monthVal = objSplit[1];
              var dayNum = objSplit[2];
              var yearNum = objSplit[3];

              var timeNum = objSplit[4];

              timeNum = timeNum.substring(0, 5);

              if (after) {

                timeNum = timeNum + "PM ";

              } else {
                timeNum = timeNum + "AM ";
              }

              if (timeNum[0] == "0") {
                timeNum = timeNum.substring(1, timeNum.length);
              }
              console.log(timeNum);
              if (timeNum.substring(0, 4) == "0:00") {
                timeNum = "midnight";
              }

              eventToAdd.time = dayOfWeek + ", " + monthVal + " " + dayNum + " " + yearNum + " at " + timeNum;
              // if "Free" follows "Cost:"

              if (costIndex == -1 || (description.indexOf("Free") <= costIndex + 8 && description.indexOf("Free") != -1) ||
                (description.indexOf("free") <= costIndex + 8 && description.indexOf("free") != -1) ||
                (description.indexOf("FREE") <= costIndex + 8 && description.indexOf("FREE") != -1)) {

                cost = 0;
                eventToAdd.cost = cost;
              }

              // has "Information"
              else if (costIndex != -1 && timeDenoter != -1) {
                var cost = description.substring(costIndex + 6, timeDenoter);

                eventToAdd.cost = parseInt(cost.substring(1, cost.length));
              }
              // no "Information
              else if (costIndex != -1 && timeDenoter == -1) {
                var cost = description.substring(costIndex + 6, description.length - 1);
                eventToAdd.cost = parseInt(cost.substring(1, cost.length));
              }


              // parse and add the event LINK
              var link = items[key]["link"];
              eventToAdd.link = link;

              // parse and add the event COST


              if (description.indexOf("<a href") != -1) {
                for (var i = description.indexOf("</"); i > 0; i--) {
                  if (description.charAt(i) == '>') {
                    //console.log(description.substring(i + 1, description.indexOf("</")));
                    eventToAdd.location = description.substring(i + 1, description.indexOf("</"));
                    var toReplace = description.substring(description.indexOf("<a"), description.indexOf("a>") + 2);

                    eventToAdd.description = description.replace(toReplace, eventToAdd.location);
                    //console.log(eventToAdd.description);
                  }

                }
              }

              // ADD CATEGORIES HERE
              description = description.toUpperCase();
              eventName = eventName.toUpperCase();

              eventToAdd.genre = that.categorizer(description, eventName);

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
            resolve();
          }).then(() => {
            //Add everything from the list to the database
            for (var events of list) {

              // UNCOMMENT THIS IF YOU WANT TO ADD THE EVENTS OF THE DAY TO THE DATABASE
              //console.log("This is the below events' date: " + events.date);
              console.log(events);
              // check for duplicates here
              /*this.dupObserve = this.dal.whereTitleAndDate(toAdd.title, toAdd.date);
                this.dupObserve.subscribe(data => {
                if (data.length < 1) {
                  console.log("Added it ^^^");
                }

              })*/
              //that.dal.addToList(events);
              //console.log(events);

            }

          });
        });
    }
  }

  getIsthmusEvents() {
    var that = this;
    //var proxy = 'https://cors-anywhere.herokuapp.com/'

    rssGet.load('https://isthmus.com/search/event/calendar-of-events/index.rss', function (err, rss) {
      // get the specific items (go one layer down)
      var items = rss["items"];
      let list: Array<Event> = [];
      var promise = new Promise((resolve, reject) => {
        var mySet = new Set();


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

          var tempDate = that.date(splitted);

          eventToAdd.time = "" + that.timeFunc(splitted);
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
          eventToAdd.location = that.location(title.substring(timeIndex + 3))


          // parse and add the event DESCRIPTION
          var description = items[key]["description"];
          eventToAdd.description = description;

          // parse and add the event LINK
          var link = items[key]["link"];
          eventToAdd.link = link;

          // parse and add the event COST
          eventToAdd.cost = +that.cost(description);



          // ADD CATEGORIES HERE
          description = description.toUpperCase();
          eventName = eventName.toUpperCase();

          eventToAdd.genre = that.categorizer(description, eventName);

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
        resolve();
      }).then(() => {
        //Add everything from the list to the database
        for (var events of list) {


          // UNCOMMENT THIS IF YOU WANT TO ADD THE EVENTS OF THE DAY TO THE DATABASE
          //console.log(events);
          // check for duplicates here
          /*this.dupObserve = this.dal.whereTitleAndDate(toAdd.title, toAdd.date);
           this.dupObserve.subscribe(data => {
           if (data.length < 1) {
           console.log("Added it ^^^");
           }

           })*/
          //that.dal.addToList(events);

        }

      });
    });

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
