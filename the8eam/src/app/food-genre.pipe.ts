import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodGenre'
})
export class FoodGenrePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
