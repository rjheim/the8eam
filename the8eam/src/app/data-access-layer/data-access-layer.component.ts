
import { Component, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Event } from './event';

@Component ( {
  selector: 'app-data-access-layer' ,
  templateUrl: './data-access-layer.component.html' ,
  styleUrls: [ './data-access-layer.component.css' ]
} )

@Injectable ()
export class DataAccessLayerComponent {
  calendar: AngularFirestoreCollection<Event>;
  list: AngularFirestoreCollection<Event>;
  calendarItems: Observable<Event[]>;
  listItems: Observable<Event[]>;
  model: Event;

  constructor(db: AngularFirestore) {
  	this.calendar = db.collection<Event>('calendar');
  	this.list = db.collection<Event>('list');
  	this.calendarItems = this.calendar.valueChanges();
  	this.listItems = this.list.valueChanges();
    this.model = {} as Event;
    this.model.report = 0;
  }

  getCalendar () {
    return this.calendarItems;
  }

  getList() { return this.listItems; }

  public addToCalendar(event: Event)
  {
    this.calendar.add(event);
  }

  addToList(event: Event)
  {
  	this.list.add(event);
  }

  removeFromCalendar(key: string)
  {
  	this.calendar.doc(key).delete();
  }

  removeFromList(key: string)
  {
  	this.list.doc(key).delete();
  }

  practiceAdd(){
    this.addToCalendar(this.model);
  }

  practiceRemove(key: string){
    console.log(key);
  }
}
