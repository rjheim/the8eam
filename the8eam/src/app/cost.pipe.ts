import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost'
})
export class CostPipe implements PipeTransform {

  transform(event: any, cost: number): any {
    if(event == null || cost == -1) return event;
    return event.filter(function(event){
      //search the the genres string for the genre, if indexof() doesn't return -1, the genre exists
      return event.cost <= cost;
    });
  }

}
