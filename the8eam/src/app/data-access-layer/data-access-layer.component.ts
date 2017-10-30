
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
  list: AngularFirestoreCollection<Event>;
  listItems: Observable<Event[]>;
  model: Event;

  constructor(db: AngularFirestore) {
  	this.list = db.collection<Event>('list');
  	this.listItems = this.list.snapshotChanges().map(actions => {
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

  removeFromList(key: string)
  {
  	this.list.doc(key).delete();
  }

  practiceAdd(){
    this.addToList(this.model);
  }
}
