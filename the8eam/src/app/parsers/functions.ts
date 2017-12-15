

export class Parser {

  // ALL OF THE SETS WE WILL BE COMPARING DESCRIPTIONS TO

  musicArray = ["MUSIC", "SONG", "SINGING", "JAZZ", "ROCK", "PIANO", "GUITAR", "DRUMS", "CONCERT", "SING-ALONG", "MIC", "SOUL", "AMERICANA", "RAP", "RAPPER", "SINGER", "POP", "BLUES", "FOLK", "HIP", "COUNTRY", "ELECTRONIC", "RAVE", "REGGAE", "CLASSICAL", "PUNK", "FUNK", "RHYTHM", "TECHNO", "DISCO", "METAL", "DUBSTEP", "OPERA"];
  musicSet: Set<string> = new Set<string>(this.musicArray);

  literaryArray = ["WORD", "SLAM", "POETRY", "POET", "LITERATURE", "BOOK", "BOOKS", "WRITE", "WRITING", "NOVEL", "WRITER", "AUTHOR", "READING", "SIGNING", "READ"];
  literarySet: Set<string> = new Set<string>(this.literaryArray);

  artArray = ["ARCHITECTURE", "CERAMICS", "COLLAGE", "DESIGN", "DRAWING", " CHALK", "CHARCOAL", "PASTEL", "GRAFFITI", "GRAPHIC", "GRAPHICS", "ILLUSTRATION", "JEWELLERY", "METALWORK", "MOSAIC", "PAINT", "PAINTING", "PAINTER", "ART", "ARTIST", "ACRYLICS", "OILS", "OIL", "PHOTO", "PHOTOGRAPHY", "PRINT", "ENGRAVING", "SCULPTURE", "STAINED GLASS", "TAPESTRY", "ABSTRACT", "PORTRAIT", "LANDSCAPE", "IMPRESSIONISM", "POST-IMPRESSIONISM", "CUBISM", "SURREALISM"];
  artSet: Set<string> = new Set<string>(this.artArray);

  danceArray = ["WALTZ", "TANGO", "CHACHA", "CHA-CHA", "RUMBA", "SAMBA", "MAMBO", "QUICKSTEP", "JIVE", "BOLERO", "CHARLESTON", "SWING", "TAP", "BOOGIE", "SALSA", "FLAMENCO", "LAMBADA", "POLKA", "JIVE", "CAPOERIA", "LINE DACE", "BELLY DANCE", "FOLK DANCE", "BALLET", "CONTEMPORARY", "MODERN", "DISCO", "BOLLYWOOD", "BREAKDANCE", "BALLROOM", "IRISH", "HUSTLE", "JITTERBUG", "FOXTROT", "MERENGUE", "ZUMBA", "POLE DANCE", "DANCE"];
  danceSet: Set<string> = new Set<string>(this.danceArray);

  foodArray = ["MARKET", "BREAKFAST", "BRUNCH", "LUNCH", "TEA", "DINNER", "SUPPER", "SNACK", "MEAL", "DESSERT", "HORS", "D’OEUVRE", "ENTREE", "SIDE", "BANQUET", "BUFFET", "CUISINE", "DRINK", "EAT", "EATING", "VEGAN", "VEGETARIAN", "ITALIAN", "SEAFOOD", "MEXICAN", "VIETNAMESE", "THAI", "SAUSAGE", "BARBECUE", "BARBEQUE", "BBQ", "SUSHI", "HOT DOG", "BURGER", "STEAK", "MEDITERRANEAN", "PERUVIAN", "GREEK", "BRAZILIAN", "ASIAN", "SOUL FOOD", "DONUT", "DOUGHNUT", "BEER", "ICE", "KOREAN", "FOOD TRUCK", "TAPAS", "TACO", "TASTE", "SIP", "MUNCH", "RESTAURANT", "BAR", "DINER"];
  foodSet: Set<string> = new Set<string>(this.foodArray);

  familyArray = ["DAYCARE","KID", "KIDS", "CHILD", "PARENTAL","PARENT", "MOM","DAD", "CHILDREN","LEGO", "PARENTS","MOTHER","FATHER", "CARE", "KINDERGARTEN","ELEMENTARY", "SCHOOL", "MIDDLE","TOY", "PLAYGROUND", "FAMILY", "FAMILIES"];
  familySet: Set<string> = new Set<string>(this.familyArray);

  theaterArray = ["STAGE", "DRAMA", "MUSICAL", "SHAKESPEARE", "THEATRICAL", "ACT", "ACTING", "ACTRESS", "COMEDY", "TRAGEDY", "ACTORS", "OPERA", "PLAY"];
  theaterSet: Set<string> = new Set<string>(this.theaterArray);

  filmArray = ["MOVIE", "FILM", "ACTRESS","FILMING", "ACTOR","ACTORS","ACTRESSES", "ACTION","ADVENTURE","COMEDY","THRILLER", "DRAMA","HOLLYWOOD","BOLLYWOOD","DIRECTOR","TRAILER", "CINEMA","CARTOON","ANIME","SOUNDTRACK","COSTUME","DOCUDRAMA","DOCUMENTARY","FILMSTRIP"];
  filmSet: Set<string> = new Set<string>(this.filmArray);


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

    day = splitted[1];
    if (day.indexOf(',') != -1) {

      day = day.substring(0, day.length - 1);
    }
    if (day.length == 1) {
      day = `0` + day;
    }

    // year
    let year = 2017;
    let date = "" + year + month + day;
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


    let music: number = 0,
      literary: number = 0,
      dance: number = 0,
      food: number = 0,
      art: number = 0,
      family: number = 0,
      film: number = 0,
      theater: number = 0,
      genres: string = "";

    let descr = description.split(" ");

    for (let indx in descr) {
      let word = descr[indx];
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



      if (this.musicSet.has(word)) {
        ++music;
      }

      if (this.literarySet.has(word)) {
        ++literary;
      }


      if (this.foodSet.has(word)) {
        ++food;
      }


      if (this.artSet.has(word)) {
        ++art;
      }


      if (this.danceSet.has(word)) {
        ++dance;
      }

      // CHECK FAMILY SET
      if (this.familySet.has(word)) {
        ++family;
      }

      // CHECK THEATER SET
      if (this.theaterSet.has(word)) {
        ++theater;
      }

      // CHECK FILM SET
      if (this.filmSet.has(word)) {
        ++film;
      }

    }


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
}
