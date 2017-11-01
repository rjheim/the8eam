import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artGenre'
})
export class ArtGenrePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
