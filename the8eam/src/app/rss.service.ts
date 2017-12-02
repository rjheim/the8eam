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

var theaterArray = ["THEATER", "STAGE", "DRAMA", "MUSICAL", "SHAKESPEARE", "THEATRE", "THEATRICAL", "ACT", "ACTING", "ACTRESS", "COMEDY", "TRAGEDY", "DRAMA", "ACTORS", "OPERA", "PLAY"]
let theaterSet: Set<string> = new Set<string>(theaterArray);

var filmArray = ["MOVIE", "FILM", "ACTRESS","FILMING","THEATER", "ACTOR","ACTORS","ACTRESSES", "ACTION","ADVENTURE","COMEDY","THRILLER", "DRAMA","HOLLYWOOD","BOLLYWOOD","DIRECTOR","TRAILER", "WUD","UNION", "CINEMA","CARTOON","ANIME","SOUNDTRACK","COSTUME","DOCUDRAMA","DOCUMENTARY","FILMSTRIP"]
let filmSet: Set<string> = new Set<string>(filmArray);


@Injectable()
export class RssService {
  dupObserve: Observable<Event[]>;

  constructor(private dal: DataAccessLayerService) {

  }

  testRSS() {
    this.getIsthmusEvents();
    this.getUWEvents();
    //this.testiCal();
    //let list: Array<Event> = [];
    /*var promise = new Promise((resolve, reject) => {
      var mySet = new Set();

    });*/

  }

  // DATE FUNCTION
  date(splitted) {
    // month
    let month = 0;
    let day = '';
    switch (splitted[0]) {
      case'Jan' || 'January':
        month = 1;
        break;
      case'Feb' || 'February':
        month = 2;
        break;
      case'Mar' || 'March':
        month = 3;
        break;
      case'Apr' || 'March':
        month = 4;
        break;
      case'May':
        month = 5;
        break;
      case'Jun' || 'June':
        month = 6;
        break;
      case'Jul' || 'July':
        month = 7;
        break;
      case'Aug' || 'August':
        month = 8;
        break;
      case'Sep' || 'September':
        month = 9;
      case'Oct' || 'October':
        month = 10;
        break;
      case'Nov' || 'November':
        month = 11;
        break;
      case'Dec' || 'December':
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

    var date = "" + year + month + day;
    return +date;
  }

  // TIME FUNCTION
  timeFunc(splitted) {
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

    return specTime;
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

    // trim the punctuation




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


      // CHECK MUSIC SET
      /*
      musicSet.forEach(function (item) {
        if (description.indexOf(item) != -1) {
          music = true;

        }
        if (eventName.indexOf(item) != -1) {
          music = true;
        }
      }, this);
      */

      if (musicSet.has(word)) {
        ++music;
      }

      // CHECK SPOKEN WORD SET
      /*
      spokenWordSet.forEach(function (item) {
        if (description.indexOf(item) != -1) {
          spokenWord = true;
        }
        if (eventName.indexOf(item) != -1) {
          spokenWord = true;
        }
      }, this);
      */
      if (literarySet.has(word)) {
        ++literary;
      }

      // CHECK FOOD SET
      /*
      foodSet.forEach(function (item) {
        if (description.indexOf(item) != -1) {
          food = true;
        }
        if (eventName.indexOf(item) != -1) {
          food = true;
        }
      }, this);
      */

      if (foodSet.has(word)) {
        ++food;
      }

      // CHECK ART SET
      /*
      artSet.forEach(function (item) {
        if (description.indexOf(item) != -1) {
          art = true;
        }
        if (eventName.indexOf(item) != -1) {
          art = true;
        }
      }, this);
    */

      if (artSet.has(word)) {
        ++art;
      }

      // CHECK DANCE SET

      /*
      danceSet.forEach(function (item) {
        if (description.indexOf(item) != -1) {
          dance = true;
        }
        if (eventName.indexOf(item) != -1) {
          dance = true;
        }
      }, this);
    */

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

    rssGet.load(proxy + 'https://today.wisc.edu/events.rss2', function (err, rss) {

    //rssGet.load('https://isthmus.com/search/event/calendar-of-events/index.rss', function (err, rss) {
      // get the specific items (go one layer down)
      var items = rss["items"];
      let list: Array<Event> = [];
      var promise = new Promise((resolve, reject) => {
        var mySet = new Set();


        for (var key in items) {
          console.log(items[key]);

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
          //eventToAdd.time = time;

          var splitted = time.split(" ", 5);

          eventToAdd.date = that.date(splitted);
          eventToAdd.time = +that.timeFunc(splitted);


          // parse and add the LOCATION
          eventToAdd.location = that.location(title.substring(timeIndex + 3))


          // parse and add the event DESCRIPTION
          var description = items[key]["description"];
          //console.log(description);
          eventToAdd.description = description;

          // parse and add the event LINK
          var link = items[key]["link"];
          eventToAdd.link = link;

          // parse and add the event COST
          eventToAdd.cost = that.cost(description);


          //var keys = description.split(" ", 100);


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

          //console.log(list);
        }
        resolve();
      }).then(() => {
        //Add everything from the list to the database
        for (var events of list) {


          // UNCOMMENT THIS IF YOU WANT TO ADD THE EVENTS OF THE DAY TO THE DATABASE
          console.log(events);
          // check for duplicates here
          /*this.dupObserve = this.dal.whereTitleAndDate(toAdd.title, toAdd.date);
            this.dupObserve.subscribe(data => {
            if (data.length < 1) {
              console.log("Added it ^^^");
            }

          })*/
          //this.dal.addToList(toAdd);

        }

      });
    });

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
          console.log(items[key]);

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
          //eventToAdd.time = time;

          var splitted = time.split(" ", 5);

          eventToAdd.date = that.date(splitted);
          eventToAdd.time = +that.timeFunc(splitted);


          // parse and add the LOCATION
          eventToAdd.location = that.location(title.substring(timeIndex + 3))


          // parse and add the event DESCRIPTION
          var description = items[key]["description"];
          //console.log(description);
          eventToAdd.description = description;

          // parse and add the event LINK
          var link = items[key]["link"];
          eventToAdd.link = link;

          // parse and add the event COST
          eventToAdd.cost = that.cost(description);


          //var keys = description.split(" ", 100);


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

          //console.log(list);
        }
        resolve();
      }).then(() => {
        //Add everything from the list to the database
        for (var events of list) {


          // UNCOMMENT THIS IF YOU WANT TO ADD THE EVENTS OF THE DAY TO THE DATABASE
          console.log(events);
          // check for duplicates here
          /*this.dupObserve = this.dal.whereTitleAndDate(toAdd.title, toAdd.date);
           this.dupObserve.subscribe(data => {
           if (data.length < 1) {
           console.log("Added it ^^^");
           }

           })*/
          //this.dal.addToList(toAdd);

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
      console.log(ical);
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
