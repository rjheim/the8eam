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
        eventToAdd.time = time;

        var splitted = time.split(" ", 5);


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
        var date = "" + year + month + day;

        eventToAdd.date = +date;
        eventToAdd.time = time;



        // parse and add the LOCATION
        var location = title.substring(timeIndex + 3);
        if (location.length < 1) {
          location = "See description.";
        }
        eventToAdd.location = location;


        // parse and add the event DESCRIPTION
        var description = items[key]["description"];
        //console.log(description);
        eventToAdd.description = description;

        // parse and add the event LINK
        var link = items[key]["link"];
        eventToAdd.link = link;






        // parse and add the event COST
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
        eventToAdd.cost = cost;
        var keys = description.split(" ", 100);





        //keys = keys.toUpperCase;
        description = description.toUpperCase();
        eventName = eventName.toUpperCase();
        //console.log(description);
        // musicSet and spokenWordSet

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
        eventToAdd.genre = genres;



        // set default report value to ZERO
        eventToAdd.report = 0;
        if (list.indexOf(eventToAdd) == -1) {
          list.push(eventToAdd);
        }

      }
      resolve();
     })
    }).then(() => {
      //Add everything from the list to the database
      for (var toAdd of list) {


        // UNCOMMENT THIS IF YOU WANT TO ADD THE EVENTS OF THE DAY TO THE DATABASE
        console.log(toAdd);
        //this.dal.addToList(toAdd);

      }

    });
  }


  ngOnInit(){
    //console.log("OnItit");
    this.testRSS();
  }

}
