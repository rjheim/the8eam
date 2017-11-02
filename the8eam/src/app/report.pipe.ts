import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'report'
})
export class ReportPipe implements PipeTransform {

  transform(event: any, args?: any): any {
    if (event == null) return event;

    return event.filter(function(event) {
      return event.report <= 5;
    });
  }

}
