import { SearchPipe } from './search.pipe';
import {Event} from "./event";

describe('SearchPipe', () => {
  const pipe = new SearchPipe();
  let words: string;
  let event1 = new Event();
  let event2 = new Event();
  let event3 = new Event();
  let list1: Event[] = [event1, event2, event3];
  let list2: Event[] = [];
  event1.description = "This is event 1";
  event1.title = "Nothing like this";
  event2.description = "I am a bug";
  event2.title = "A Bug's Life";
  event3.description = "This is event 3";
  event3.title = "Another unique name";

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Won\'t search when only whitespace', () => {
    words = "\n\t\r    ";
    expect(pipe.transform(list1, words)[1].description).toBe(list1[1].description);
  });

  it('Returns full list when undefined', () => {
    words = null;
    expect(pipe.transform(list1, words)[1].description).toBe(list1[1].description);
  });

  it('Returns multiple objects that have same text', () => {
    words = "This is event";
    list2.push(event1);
    list2.push(event3);
    expect(pipe.transform(list1, words)[1].description).toBe(list2[1].description);
  });

  it('Returns one object', () => {
    list2 = [];
    words = "Bug";
    list2.push(event2);
    expect(pipe.transform(list1, words)[0].description).toBe(list2[0].description);
  });
});
