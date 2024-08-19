import { TestBed } from '@angular/core/testing';

import { FeaturelistService } from './featurelist.service';

describe('FeaturelistService', () => {
  let service: FeaturelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
