import { FilmGenrePipe } from './film-genre.pipe';
import {Event} from "./event";

describe('FilmGenrePipe', () => {
  const pipe = new FilmGenrePipe();
  let testEvent1 = new Event();
  let testEvent2 = new Event();
  let inputList: Event[] = [];
  let outputList: Event[] = [];

  it('create an instance', () => {
    //const pipe = new FilmGenrePipe();
    expect(pipe).toBeTruthy();
  });
  it ('Filters to only show film genre items', () => {
    testEvent1.genre = "film";
    testEvent2.genre = "music";
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, true)[0].date).toBe(outputList[0].date);
  });

  it ('False so don\'t filter', () => {
    testEvent1.genre = "film";
    testEvent2.genre = "music";
    inputList.push(testEvent2);
    inputList.push(testEvent1);
    outputList.push(testEvent2);
    outputList.push(testEvent1);
    expect(pipe.transform(inputList, false)[0].date).toBe(outputList[0].date);
  });
});
