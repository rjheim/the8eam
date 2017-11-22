import { TestBed, inject } from '@angular/core/testing';

import { DataAccessLayerService } from './data-access-layer.service';

describe('DataAccessLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataAccessLayerService]
    });
  });

  it('should be created', inject([DataAccessLayerService], (service: DataAccessLayerService) => {
    expect(service).toBeTruthy();
  }));
});
