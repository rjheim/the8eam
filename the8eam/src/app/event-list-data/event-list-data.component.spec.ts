import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListDataComponent } from './event-list-data.component';
import {CostPipe} from "../cost.pipe";
import {ReportPipe} from "../report.pipe";
import {ArtGenrePipe} from "../art-genre.pipe";
import {DanceGenrePipe} from "../dance-genre.pipe";
import {FoodGenrePipe} from "../food-genre.pipe";
import {MusicGenrePipe} from "../music-genre.pipe";
import {SpokenWordGenrePipe} from "../spoken-word-genre.pipe";
import {Component , Input} from "@angular/core";
import {Event} from "../event";
import {DataAccessLayerService} from "../data-access-layer.service";
import {Observable} from "rxjs/Observable";
import {FilterVarsService} from "../filter-vars.service";

@Component({
      selector: 'app-event',
      template: ''
    })
    class MockEventComponent {
      @Input()
      eventItem: Event;
  }
class MockDAL {
    event1 : Event;
    event2 : Event;

    getList() {

      return Observable.create( observer => {
        observer.next([this.event1, this.event2]);
        observer.complete();

      });
    }
}

xdescribe('EventListDataComponent', () => {
  let component: EventListDataComponent;
  let fixture: ComponentFixture<EventListDataComponent>;
  let mockDAL = new MockDAL();



  beforeEach(async(() => {
    var event1 = new Event();
    var event2 = new Event();

    TestBed.configureTestingModule({
      declarations: [
        EventListDataComponent,
        CostPipe,
        ReportPipe,
        ArtGenrePipe,
        DanceGenrePipe,
        FoodGenrePipe,
        MusicGenrePipe,
        SpokenWordGenrePipe,
        MockEventComponent
      ],
      providers: [
        FilterVarsService,
        DataAccessLayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListDataComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

