import { Component, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Event { 
	title: string;
	cost: number;
	date: string;
	description: string;
	genre: string;
	link: string;
	location: string;
	report: number;
}

@Component({
  selector: 'app-data-access-layer',
  templateUrl: './data-access-layer.component.html',
  styleUrls: ['./data-access-layer.component.css']
})

@Injectable()
export class DataAccessLayerComponent {
  calendar: AngularFirestoreCollection<Event>;
  list: AngularFirestoreCollection<Event>;
  calendarItems: Observable<Event[]>;
  event: Event;

  constructor(db: AngularFirestore) { 
  	console.log("Initialized db");
  	this.calendar = db.collection('calendar');
  	this.list = db.collection('list');
  	this.calendarItems = this.calendar.valueChanges();
  	this.event = {} as Event;
  	this.event.title = "test";
  	this.event.description = "test";
  	this.event.genre = "test";
  	this.event.date = "test";
  	this.event.location = "test";
  	this.event.link = "test";
  	this.event.cost = 10;
  	this.event.report = 0;
  }

  getCalendar() { return this.calendarItems; }

  getList() { return this.list; }

}
