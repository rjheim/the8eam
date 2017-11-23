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



  it ('transforms 20170101 to 20170102 when filtering for today', () => {

    testEvent1.date = 20170101;
    testEvent2.date = 20170102;
    testDate = new Date("2017-01-02");
    inputList.push(testEvent1);
    inputList.push(testEvent2);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 0, testDate)[0].date).toBe(outputList[0].date);
  });


  it ('transforms 20170101 to 20170108 when filtering by one week', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170101;
    testEvent2.date = 20170110;
    testDate = new Date("2017-01-02");
    inputList.push(testEvent1);
    inputList.push(testEvent2);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });


  it ('transforms 20170225 to 20170304 when filtering by one week end of Feb edge case', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170225;
    testEvent2.date = 20170305;
    testDate = new Date("2017-02-26");
    inputList.push(testEvent1);
    inputList.push(testEvent2);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });


  it ('transforms 20170928 to 20171005 when filtering by one week end of 30 day month edge case', () => {
    inputList = [];
    outputList = [];
    testEvent1.date = 20170928;
    testEvent2.date = 20171005;
    testDate = new Date("2017-09-29");
    inputList.push(testEvent1);
    inputList.push(testEvent2);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, 7, testDate)[0].date).toBe(outputList[0].date);
  });

});
