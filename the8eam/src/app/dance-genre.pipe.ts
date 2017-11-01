import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'danceGenre'
})
export class DanceGenrePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
