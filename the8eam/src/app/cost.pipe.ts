import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost'
})
export class CostPipe implements PipeTransform {

  transform(events: any, cost: number): any {
    if(events == null || cost == -1) return events;
    return events.filter(function(event){
      return event.cost <= cost;
    });
  }

}
