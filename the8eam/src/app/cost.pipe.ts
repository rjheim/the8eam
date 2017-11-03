import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost'
})
export class CostPipe implements PipeTransform {

  transform(event: any, cost: number): any {
    if(event == null || cost == -1) return event;
    return event.filter(function(event){
      return event.cost <= cost;
    });
  }

}
