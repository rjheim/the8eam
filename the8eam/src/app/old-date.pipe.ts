import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oldDate'
})
export class OldDatePipe implements PipeTransform {

  transform(events: any): any {
    if(events == null) return event;
    return events.filter(function(event){
      let curDate = new Date();
      let m = "" + curDate.getMonth();
      let d = "" + curDate.getDate();
      let y = "" + curDate.getFullYear();
      let tempDay;
      let tempMonth;
      tempMonth = +m + 1;
      tempDay = +d;
      if (tempMonth < 10){
        m = "0" + tempMonth.toString();
      }
      else {
        m = tempMonth.toString();
      }
      if (tempDay < 10){
        d = "0" + tempDay.toString();
      }
      else {
        d = tempDay.toString();
      }
      let cur = y + m + d + '0000';
      let curNum = +cur;

      return event.date >= curNum;
    });
  }
}
