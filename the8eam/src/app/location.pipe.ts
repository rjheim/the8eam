import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(events: any, loc: number, dist: number): any {
    if(events == null || loc == -1 || dist == -1) return events;
    return events.filter(function(event){
      return event.locDist[loc] <= dist;
    });
  }
}
