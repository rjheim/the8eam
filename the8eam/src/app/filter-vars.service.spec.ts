import { TestBed, inject } from '@angular/core/testing';

import { FilterVarsService } from './filter-vars.service';

describe('FilterVarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterVarsService]
    });
  });

  it('should be created', inject([FilterVarsService], (service: FilterVarsService) => {
    expect(service).toBeTruthy();
  }));
});
