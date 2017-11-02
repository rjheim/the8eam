import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(event: any, date: number): any {
    if(event == null || date == -1) return event;
    return event.filter(function(event){
      var curDate = new Date();
      var m = "" + curDate.getMonth() + 1;
      var d = "" + curDate.getDate();
      var y = "" + curDate.getFullYear();
      var cur = m + d + y;
      var curNum = +cur;
      return event.date == curNum + date;
    });
  }
}
