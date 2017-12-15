import {async , ComponentFixture , inject , TestBed} from '@angular/core/testing';

import { OptionsMenuComponent } from './options-menu.component';
import {FilterVarsService} from "../filter-vars.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('OptionsMenuComponent', () => {
  let component: OptionsMenuComponent;
  let fixture: ComponentFixture<OptionsMenuComponent>;
  let activeTabEl : DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsMenuComponent ],
      providers: [ FilterVarsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // Test that the Options-Menu is successfully created
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Filter-Vars Service', inject([FilterVarsService], (filterService: FilterVarsService) => {
    expect(filterService).toEqual(component.filter);
  }));
  it('should show default Genre tab if invalid tab number is passed to clickViewTab()', () => {
    let el : HTMLElement;
    component.clickViewTab(5); //Outside of valid range
    activeTabEl = fixture.debugElement.query(By.css('a.filter-tab.active'));
    el = activeTabEl.nativeElement;
    fixture.detectChanges();
    expect(el.textContent.replace(/\s/g,'')).toBe('Genre');
  });
  it('should show corresponding tab when passed a valid tab number', () => {
    let el : HTMLElement;
    component.clickViewTab(2); // Date tab
    fixture.detectChanges();
    activeTabEl = fixture.debugElement.query(By.css('a.filter-tab.active'));
    el = activeTabEl.nativeElement;
    fixture.detectChanges();
    expect(el.textContent.replace(/\s/g,'')).toBe('Date');
  });
});
