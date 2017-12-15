import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(events: any, searchTxt: string): any {
    if (!searchTxt){
      return events;
    }
    else {
      if (/\S/.test(searchTxt)) {
        // string is not empty and not just whitespace
        let wordArray = searchTxt.match(/\S+/g);
        let check: Boolean;
        return events.filter(function (event) {
          check = true;
          for (let word of wordArray) {
            check = (event.description.toLowerCase().includes(word.toLowerCase()) && check) ||
              (event.title.toLowerCase().includes(word.toLowerCase()) && check) ||
              (event.location.toLowerCase().includes(word.toLowerCase()) && check) ||
              (event.genre.toLowerCase().includes(word.toLowerCase()) && check);
          }
          if (check) {
            return event
          }
        });
      }
      else return events;
    }
  }

}
