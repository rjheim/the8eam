import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import {Component , Input} from "@angular/core";

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventComponent,
        MockReportComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create an instance', () => {
    expect(component).toBeTruthy();
  });

});
@Component({
  selector: 'app-report',
  template: ''
})
class MockReportComponent{
  @Input()
  eventItem: Event;
}
