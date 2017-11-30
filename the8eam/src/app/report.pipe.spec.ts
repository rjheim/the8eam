import { ReportPipe } from './report.pipe';
import {Event} from "./event";

describe('ReportPipe', () => {
  const pipe = new ReportPipe();
  let testEvent1 = new Event();
  let testEvent2 = new Event();
  let inputList: Event[] = [];
  let outputList: Event[] = [];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it ('Filters to only show items with report < 6', () => {
    testEvent1.report = 4;
    testEvent2.report = 7;
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList)[0].report).toBe(outputList[0].report);
  });
  it ('If null just return', () => {
    inputList = null;
    outputList = null;
    expect(pipe.transform(inputList)).toBe(outputList);
  });
});
