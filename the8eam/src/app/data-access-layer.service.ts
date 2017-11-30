import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Event } from './event';
import { Report } from './report'

@Injectable ()
export class DataAccessLayerService {
  list: AngularFirestoreCollection<Event>;
  report: AngularFirestoreCollection<Report>;
  listItems: Observable<Event[]>;
  model: Event;
  length: number;
  testEvent: Observable<Event[]>;

  constructor(public db: AngularFirestore) {
    this.list = db.collection<Event>('list');
    this.report = db.collection<Report>('reportData');
    this.listItems = db.collection<Event>('list',
      a => a.orderBy("date")).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.model = {} as Event;
    this.model.report = 0;
  }

  getList() {
    return this.listItems;
  }

  addToList(event: Event)
  {
    this.list.add(event);
  }

  addToReport(report: Report)
  {
    this.report.add(report);
  }

  removeFromList(key: string)
  {
    this.list.doc(key).delete();
  }

  whereTitleAndDate(title: string, date: number){
    return(this.db.collection<Event>('list',
      a => a.where('title', '==', title).where('date', '==', date)))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

  updateDoc(key: string, event: Event)
  {
    this.list.doc(key).update(event);
  }

  practiceAdd(){
    this.addToList(this.model);
  }

  testWhereTitleAndDate(title: string, date: number){
    this.testEvent = this.whereTitleAndDate(title, date);
    this.testEvent.subscribe(data => (this.length = data.length));
  }
}

