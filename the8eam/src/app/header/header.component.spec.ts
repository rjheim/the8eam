import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {Component , DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockSearchComponent,
        MockOptionsMenuComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show options-menu-component when "Filters" button is clicked', () => {
    component.showFilters = false;
    component.filterMenu(); // set show to true
    fixture.detectChanges();
    de = fixture.debugElement.query ( By.css ( 'app-options-menu' ) );

    expect(de.nativeElement).toBeTruthy();
  });
  it('should hide a visible options-menu-component when "Filters" button is clicked', () => {
    component.showFilters = true;
    component.filterMenu(); // set show to false
    fixture.detectChanges();
    de = fixture.debugElement.query ( By.css ( 'app-options-menu' ) );

    expect(de).toBeFalsy();
  });
});
@Component({
  selector: 'app-search',
  template: ''
})
class MockSearchComponent{

}
@Component({
  selector: 'app-options-menu',
  template: ''
})
class MockOptionsMenuComponent{

}
