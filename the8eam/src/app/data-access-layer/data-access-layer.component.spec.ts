import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAccessLayerComponent } from './data-access-layer.component';

describe('DataAccessLayerComponent', () => {
  let component: DataAccessLayerComponent;
  let fixture: ComponentFixture<DataAccessLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAccessLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAccessLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
