import { CostPipe } from './cost.pipe';
import { Event } from './event';

describe('CostPipe', () => {
  const pipe = new CostPipe();
  let testEvent1 = new Event();
  let testEvent2 = new Event();
  let inputList: Event[] = [];
  let outputList: Event[] = [];
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Filters all costs greater than x out of the list', () => {
    testEvent1.cost = 10;
    testEvent2.cost = 15;
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList,10)[0].cost).toBe(outputList[0].cost);
  });

  it ('If there is no filter, return the same list', () => {
    inputList = [];
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    expect(pipe.transform(inputList, -1)).toBe(inputList);
  });
});
