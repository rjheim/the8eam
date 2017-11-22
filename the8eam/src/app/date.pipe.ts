import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(event: any, date: number): any {
    if(event == null || date == -1) return event;
    return event.filter(function(event){
      var curDate = new Date();
      var m = "" + curDate.getMonth();
      var d = "" + curDate.getDate();
      var y = "" + curDate.getFullYear();
      var tempDay;
      var tempMonth;
      var tempYear;
      tempMonth = +m + 1;
      if (tempMonth < 10){
        m = "0" + tempMonth.toString();
      }
      else {
        m = tempMonth.toString();
      }
      var cur = y + m + d;
      var curNum = +cur + date;
      if (((+d > 21 && +m == 2) || (+d > 23 && (+m == 9 || +m == 4 || +m == 11 || +m == 6)) || (+d > 24))
        && date == 7) {
        if (+m == 12){
          tempYear = +y + 1;
          y = tempYear.toString();
          tempDay = 31 - +d;
        }
        else if (+m == 2){
          tempDay = 28 - +d;
        }
        else if (+m == 9 || +m == 4 || +m == 11 || +m == 6){
          tempDay = 30 - +d;
        }
        else {
          tempDay = 31 - +d;
        }
        tempDay = date - tempDay;
        tempMonth = +m + 1;
        m = tempMonth.toString();
        cur = y + m + tempDay;
        curNum = +cur;
      }
      if (date == 100 && +m == 12){
        tempYear = +y + 1;
        y = tempYear.toString();
        m = "1";
        cur = y + m + d;
        curNum = +cur;
      }
      if (date == 300 && +m > 9){
        tempYear = +y + 1;
        y = tempYear.toString();
        if (+m == 12) {
          m = "03";
        }
        if (+m == 11) {
          m = "02";
        }
        if (+m == 10) {
          m = "01";
        }
        cur = y + m + d;
        curNum = +cur;
      }
      console.log("Edited date: " + curNum + ", event.date: " + event.date);
      return event.date <= curNum;
    });
  }
}
