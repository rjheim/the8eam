import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(events: any, loc: boolean[], dist: number): any {
    if(events == null) return events;
    console.log("filtering");
    return events.filter(function(event){
      let place: number;
      if (loc[0]){
        place = 0;
        if( !event.locDist[place] ) return;
        if( event.locDist[place] == -1) return;
        return event.locDist[place] <= dist;
      }
      if (loc[1]){
        place = 1;
        if( !event.locDist[place] ) return;
        if( event.locDist[place] == -1) return;
        console.log("This events distance: " + event.locDist[place]);
        return event.locDist[place] <= dist;
      }
      if (loc[2]){
        place = 2;
        if( !event.locDist[place] ) return;
        if( event.locDist[place] == -1) return;
        console.log("This events distance: " + event.locDist[place]);
        return event.locDist[place] <= dist;
      }
      if (loc[3]){
        place = 3;
        if( !event.locDist[place] ) return;
        if( event.locDist[place] == -1) return;
        return event.locDist[place] <= dist;
      }
      if (loc[4]){
        place = 4;
        if( !event.locDist[place] ) return;
        if( event.locDist[place] == -1) return;
        return event.locDist[place] <= dist;
      }
      if (loc[5]){
        place = 5;
        if( !event.locDist[place] ) return;
        if( event.locDist[place] == -1) return;
        return event.locDist[place] <= dist;
      }
      return event;
    });
  }
}
