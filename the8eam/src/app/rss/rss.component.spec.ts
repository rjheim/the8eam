import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssComponent } from './rss.component';

xdescribe('RssComponent', () => {
  let component: RssComponent;
  let fixture: ComponentFixture<RssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
