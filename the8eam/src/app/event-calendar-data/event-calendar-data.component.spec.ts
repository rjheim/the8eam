import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarDataComponent } from './event-calendar-data.component';

describe('EventCalendarDataComponent', () => {
  let component: EventCalendarDataComponent;
  let fixture: ComponentFixture<EventCalendarDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
