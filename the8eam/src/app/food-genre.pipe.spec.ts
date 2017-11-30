import { FoodGenrePipe } from './food-genre.pipe';
import {Event} from "./event";

describe('FoodGenrePipe', () => {
  const pipe = new FoodGenrePipe();
  let testEvent1 = new Event();
  let testEvent2 = new Event();
  let inputList: Event[] = [];
  let outputList: Event[] = [];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it ('Filters to only show food genre items', () => {
    testEvent1.genre = "food";
    testEvent2.genre = "dance";
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, true)[0].date).toBe(outputList[0].date);
  });

  it ('False so don\'t filter', () => {
    testEvent1.genre = "food";
    testEvent2.genre = "dance";
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent2);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, false)[0].date).toBe(outputList[0].date);
  });
});
