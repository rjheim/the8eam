import { DatePipe } from './date.pipe';
import {Event} from "./event";

describe('DatePipe', () => {
  let pipe = new DatePipe();
  let testEvent1 = new Event();
  let testEvent2 = new Event();
  let inputList: Event[] = [];
  let outputList: Event[] = [];
  let testDate: Date;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });



  it ('Filters to only show current day filtering for today', () => {
    testEvent1.date = 20170101;
    testEvent2.date = 20170102;
    testDate = new Date("2017-01-02");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 0, testDate)[0].date).toBe(outputList[0].date);
  });


  it ('Filters to show one week when filtering by one week', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170115;
    testEvent2.date = 20170125;
    testDate = new Date("2017-01-16");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });


  it ('Tests filtering by one week end of Feb edge case', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170225;
    testEvent2.date = 20170305;
    testDate = new Date("2017-02-26");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });


  it ('Tests filtering by one week end of 30 day month edge case September', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170928;
    testEvent2.date = 20171008;
    testDate = new Date("2017-09-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by one week end of 30 day month edge case April', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170428;
    testEvent2.date = 20170508;
    testDate = new Date("2017-04-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by one week end of 30 day month edge case June', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170628;
    testEvent2.date = 20170708;
    testDate = new Date("2017-06-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by one week end of 30 day month edge case November', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171128;
    testEvent2.date = 20171208;
    testDate = new Date("2017-11-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by any day that has month > 10 and day > 10', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171124;
    testEvent2.date = 20171125;
    testDate = new Date("2017-11-25");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 0, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by one week end of 31 day month edge case', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170528;
    testEvent2.date = 20170610;
    testDate = new Date("2017-05-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by one week end of 31 day month edge case December to next year', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171228;
    testEvent2.date = 20180110;
    testDate = new Date("2017-12-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('If there is no filter, return the same list', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171228;
    testEvent2.date = 20180110;
    testDate = new Date("2017-12-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent2);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, -1, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by one month normal case', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171028;
    testEvent2.date = 20171130;
    testDate = new Date("2017-10-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by one month not normal case', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171228;
    testEvent2.date = 20180130;
    testDate = new Date("2017-12-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 100, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by 3 month not normal case jan', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171228;
    testEvent2.date = 20180330;
    testDate = new Date("2017-12-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 300, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by 3 month not normal case feb', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171128;
    testEvent2.date = 20180230;
    testDate = new Date("2017-11-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 300, testDate)[0].date).toBe(outputList[0].date);
  });

  it ('Tests filtering by 3 month not normal case mar', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20171028;
    testEvent2.date = 20180130;
    testDate = new Date("2017-10-29");
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 300, testDate)[0].date).toBe(outputList[0].date);
  });
});
