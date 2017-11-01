import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'musicGenre'
})
export class MusicGenrePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
