import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artGenre'
})
export class ArtGenrePipe implements PipeTransform {

  transform(event: any, bool: boolean): any {
    if(event == null || bool == false) return event;
    return event.filter(function(event){
      //search the the genres string for the genre, if indexof() doesn't return -1, the genre exists
      return event.genre.indexOf("art") >= 0;
    });
  }

}
