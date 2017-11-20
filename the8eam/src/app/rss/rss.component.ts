import { Component, OnInit } from '@angular/core';
import { DataAccessLayerComponent } from '../data-access-layer/data-access-layer.component';
import { Event } from '../data-access-layer/event';
import { rss } from 'rss-to-json/src/rss';
import * as parser1 from 'xml2js';
import { request } from 'request';
import * as rssGet from 'rss-to-json'
import { Observable } from 'rxjs/Observable';
import * as ical from 'ical';
import * as parser from 'xml2js-parser';
//import * as iCal from 'node-ical';
import * as converter from 'ical2json';


@Component({
  selector: 'app-rss',
  providers: [DataAccessLayerComponent],
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {
  dupObserve: Observable<Event[]>;
  constructor(private dal: DataAccessLayerComponent) {

  }

  testRSS() {

    // rssGet = require('rss-to-json');
    // ALL OF THE SETS WE WILL BE COMPARING DESCRIPTIONS TO
    var musicArray = ["MUSIC", "SONG", "SINGING", "JAZZ", "ROCK", "PIANO", "GUITAR", "DRUMS", "CONCERT", "SING-ALONG", "OPEN MIC", "SOUL", "AMERICANA"];
    let musicSet: Set<string> = new Set<string>(musicArray);

    var spokenWordArray = ["SPOKEN", "WORD", "SLAM", "POETRY", "POET"];
    let spokenWordSet: Set<string> = new Set<string>(spokenWordArray);

    var artArray = ["ARCHITECTURE", "CERAMICS", "COLLAGE", "DESIGN", "DRAWING", " CHALK", "CHARCOAL", "PASTEL", "GRAFFITI", "GRAPHIC", "GRAPHICS", "ILLUSTRATION", "JEWELLERY", "METALWORK", "MOSAIC", "PAINT", "PAINTING", "PAINTER", "ART", "ARTIST", "ACRYLICS", "OILS", "OIL", "PHOTO", "PHOTOGRAPHY", "PRINT", "ENGRAVING", "SCULPTURE", "STAINED GLASS", "TAPESTRY", "ABSTRACT", "PORTRAIT", "LANDSCAPE", "IMPRESSIONISM", "POST-IMPRESSIONISM", "CUBISM", "SURREALISM"];
      let artSet: Set<string> = new Set<string>(artArray);

    var danceArray = ["WALTZ", "TANGO", "CHACHA", "CHA-CHA", "RUMBA", "SAMBA", "MAMBO", "QUICKSTEP", "JIVE", "BOLERO", "CHARLESTON", "SWING", "TAP", "BOOGIE", "SALSA", "FLAMENCO", "LAMBADA", "POLKA", "JIVE", "CAPOERIA", "LINE DACE", "BELLY DANCE", "FOLK DANCE", "BALLET", "CONTEMPORARY DANCE", "MODERN DANCE", "DISCO", "BOLLYWOOD", "BREAKDANCE", "BALLROOM", "IRISH", "HUSTLE", "JITTERBUG", "FOXTROT", "MERENGUE", "ZUMBA", "POLE DANCE", "DANCE"];
      let danceSet: Set<string> = new Set<string>(danceArray);

    var foodArray = ["MARKET", "BREAKFAST", "BRUNCH", "LUNCH", "TEA", "DINNER", "SUPPER", "SNACK", "MEAL", "DESSERT", "HORS D’OEUVRE", "ENTREE", "SIDE", "BANQUET", "BUFFET", "CUISINE", "DRINK", "EAT", "EATING", "VEGAN", "VEGETARIAN", "ITALIAN", "SEAFOOD", "MEXICAN", "VIETNAMESE", "THAI", "SAUSAGE", "BARBECUE", "BARBEQUE", "BBQ", "SUSHI", "HOT DOG", "BURGER", "STEAK", "MEDITERRANEAN", "PERUVIAN", "GREEK", "BRAZILIAN", "ASIAN", "SOUL FOOD", "DONUT", "DOUGHNUT", "BEER", "ICE CREAM", "KOREAN", "FOOD TRUCK", "TAPAS", "STREET FOOD", "TACO", "TASTE", "SIP", "MUNCH", "RESTAURANT", "BAR", "DINER"];
    let foodSet: Set<string> = new Set<string>(foodArray);


    let list: Array<Event> = [];
    var promise = new Promise((resolve, reject) => {
      var mySet = new Set();


    // DATE FUNCTION
    function date(splitted) {
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

        var date = "" + year + month + day;
       return +date;
    }
    // TIME FUNCTION
    function timeFunc(splitted) {
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

    function location(toReturn) {
      if (toReturn.length < 1) {
        toReturn = "See description.";
      }
      return toReturn;
    }
    // COST FUNCTION

    function cost(description) {
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

    function categorizer(description, eventName) {


      let music: boolean = false;
      let spokenWord: boolean = false;
      let dance: boolean = false;
      let food: boolean = false;
      let art: boolean = false;

      // CHECK MUSIC SET
      musicSet.forEach(function(item){
        if (description.indexOf(item) != -1) {
          music = true;

        }
        if (eventName.indexOf(item) != -1) {
          music = true;
        }
      }, this);

      // CHECK SPOKEN WORD SET
      spokenWordSet.forEach(function(item){
        if (description.indexOf(item) != -1) {
          spokenWord = true;
        }
        if (eventName.indexOf(item) != -1) {
          spokenWord = true;
        }
      }, this);

      // CHECK FOOD SET
      foodSet.forEach(function(item){
        if (description.indexOf(item) != -1) {
          food = true;
        }
        if (eventName.indexOf(item) != -1) {
          food = true;
        }
      }, this);

      // CHECK ART SET
      artSet.forEach(function(item){
        if (description.indexOf(item) != -1) {
          art = true;
        }
        if (eventName.indexOf(item) != -1) {
          art = true;
        }
      }, this);

      // CHECK DANCE SET
      danceSet.forEach(function(item){
        if (description.indexOf(item) != -1) {
          dance = true;
        }
        if (eventName.indexOf(item) != -1) {
          dance = true;
        }
      }, this);


      var genres = "";

      if (music) {
        genres = genres + "music;";
        //eventToAdd.genre.push("music");
      }

      if (spokenWord) {
        genres = genres + "spoken word;";
        //eventToAdd.genre.push("spoken word");
      }

      if (dance) {
        genres = genres + "dance;";
        //eventToAdd.genre.push("dance");
      }

      if (art) {
        genres = genres + "art;";
        //eventToAdd.genre.push("art");
      }

      if (food) {
        genres = genres + "food;";
        //eventToAdd.genre.push("food");
      }
      //console.log(eventToAdd.genre);
      return genres;
    }

    rssGet.load('https://isthmus.com/search/event/calendar-of-events/index.rss', function (err, rss) {
      // get the specific items (go one layer down)
      var items = rss["items"];

      for (var key in items) {
        var eventToAdd = {} as Event;

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

        eventToAdd.date = date(splitted);
        eventToAdd.time = timeFunc(splitted);



        // parse and add the LOCATION
        eventToAdd.location = location(title.substring(timeIndex + 3))




        // parse and add the event DESCRIPTION
        var description = items[key]["description"];
        //console.log(description);
        eventToAdd.description = description;

        // parse and add the event LINK
        var link = items[key]["link"];
        eventToAdd.link = link;

        // parse and add the event COST
        eventToAdd.cost = cost(description);


        //var keys = description.split(" ", 100);



        // ADD CATEGORIES HERE
        description = description.toUpperCase();
        eventName = eventName.toUpperCase();

        eventToAdd.genre = categorizer(description, eventName);



        // set default report value to ZERO
        eventToAdd.report = 0;



        if (list.indexOf(eventToAdd) == -1) {
          list.push(eventToAdd);
        }

        //console.log(list);
      }
      resolve();
     })
    }).then(() => {
      //Add everything from the list to the database
      for (var toAdd of list) {


        // UNCOMMENT THIS IF YOU WANT TO ADD THE EVENTS OF THE DAY TO THE DATABASE
        console.log(toAdd);
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
  }

  testiCal() {
    let list: Array<Event> = [];
    var myInit = { method: 'GET',
      mode: 'no-cors',
    cache: 'default'};

    var data = ical.parseFile('majestic-theatre-7360f72fe39.ics');
    console.log(data);
    /*ical.fromURL('majestic-theatre-7360f72fe39.ics', {}, function(err, ical) {
      console.log(ical);
      for (var event in ical) {
        //console.log(ical[event]);
        var eventToAdd = {} as Event;
        eventToAdd.title = ical[event].summary;
        eventToAdd.location = ical[event].location;

      }
    })*/




  }
  ngOnInit(){
    //console.log("OnInit");
    this.testRSS();
    //this.testiCal();
  }

  testParse() {
    var parseString = parser1.parseString;
    parseString();
  }

}
