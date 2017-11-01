import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spokenWordGenre'
})
export class SpokenWordGenrePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
