import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(events: any, date: number, curDate: Date): any {
    if(events == null || date == -1) return events;
    return events.filter(function(event){
      var m = "" + curDate.getMonth();
      var d = "" + curDate.getDate();
      var y = "" + curDate.getFullYear();
      var tempDay;
      var tempMonth;
      var tempYear;
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
        if (tempMonth == 13)
        {
          m = "01";
        }
        else if (tempMonth < 10){
          m = "0" + tempMonth.toString();
        }
        else {
          m = tempMonth.toString();
        }
        if (tempDay < 10){
          d = "0" + tempDay.toString();
        }
        cur = y + m + d;
        curNum = +cur;
      }
      if (date == 100 && +m == 12){
        tempYear = +y + 1;
        y = tempYear.toString();
        m = "01";
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
      let eventDate = event.date.toString();
      let trimmedEventDate: number;
      trimmedEventDate = +eventDate.substring(0, 8);
      console.log("trimmed date = " + trimmedEventDate + " curNum = " + curNum);
      return trimmedEventDate <= curNum;
    });
  }
}
