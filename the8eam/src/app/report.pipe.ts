import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'report'
})
export class ReportPipe implements PipeTransform {

  transform(events: any, args?: any): any {
    if (events == null) return events;

    return events.filter(function(events) {
      return events.report <= 5;
    });
  }

}
