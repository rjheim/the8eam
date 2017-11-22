import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAccessLayerComponent } from './data-access-layer.component';
import {AngularFirestore , AngularFirestoreCollection} from "angularfire2/firestore";
import { Event } from "./event";
import { QueryFn } from "angularfire2/firestore/interfaces";
import * as firebase from 'firebase/app';

describe('DataAccessLayerComponent', () => {
  let component:  DataAccessLayerComponent;
  let fixture:    ComponentFixture<DataAccessLayerComponent>;
  // try spying instead of mocking
  class MockAngularFireStore extends AngularFirestore {
      public readonly firestore: firebase.firestore.Firestore;
      public collection<Event>(path : string, queryFn? : QueryFn) : AngularFirestoreCollection<Event>{
        const collectionRef = this.firestore.collection(path);
        const query = queryFn(collectionRef);
        return new AngularFirestoreCollection<Event>(collectionRef, query);
      }
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ DataAccessLayerComponent ],
      providers:    [
        {provide: AngularFirestore, useValue: MockAngularFireStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAccessLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
