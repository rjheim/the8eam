import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {Component , DebugElement , Input , } from "@angular/core";
import {By} from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import {FilterVarsService} from "../filter-vars.service";


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
      ],
      imports:[ FormsModule ],
      providers: [ FilterVarsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  xit('should create an instance', () => {
    expect(component).toBeTruthy();
  });
  it('should have a Filter-Vars Service', inject([FilterVarsService], (filter: FilterVarsService) => {
    expect(filter).toEqual(component.filter);
  }));
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
    de = fixture.debugElement.query ( By.css ( '#options-menu' ) );

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
  template: '<div *ngIf="showFilters" id="options-menu"></div>'
})
class MockOptionsMenuComponent{
  @Input() showFilters;
}
