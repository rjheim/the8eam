import {TestBed , async , ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component , DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

describe('AppComponent', () => {
  let component:     AppComponent;
  let fixture:  ComponentFixture<AppComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  // async beforeEach()
  // Sets up the "TestBed", beforeEach() is executed for each test
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockHeaderComponent,
        MockEventListDataComponent,
        MockEventCalendarDataComponent
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));
  // synchronous beforeEach()
  beforeEach(() => {
    // The fixture is what "wraps" around this component as a sort of isolated test environment
    fixture = TestBed.createComponent(AppComponent);

    component = fixture.componentInstance; // AppComponent Test Instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('#app-body'));
    console.log(de);
    el = de.nativeElement;
  });
  //First Test
  it('should create the app',() => {
    expect(component).toBeTruthy();
  });
  //Second Test
  it('should render the active view\'s bootstrap container as a "root" div', () => {
    let debEl : DebugElement;

    // Tells angular to perform change detection.
    // In production, this happens every time a componenet is created, the user enters a keystroke, or an asynchronous activity completes.
    fixture.detectChanges();

    debEl = fixture.debugElement.query(By.css('#main-view'));


    expect(debEl).toBeTruthy();
  });
  it('"List" tab should route to "/list-view" (event-list-data-component)', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#list-view-toggle'));
    expect(de.nativeElement.href).toContain('/list-view');
  });
  it('"Calendar" tab should route to "/cal-view" (event-calendar-data-component)', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#cal-view-toggle'));
    expect(de.nativeElement.href).toContain('/cal-view');
  });
  //and so on...
});
// mock components to simulate injected elements of app-component's template
@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent {
}

@Component({
  selector: 'app-event-list-data',
  template: ''
})
class MockEventListDataComponent {
}
@Component({
  selector: 'app-event-calendar-data',
  template: ''
})
class MockEventCalendarDataComponent{
}
