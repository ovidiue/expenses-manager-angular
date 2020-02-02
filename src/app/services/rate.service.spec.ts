import { TestBed } from '@angular/core/testing';

import { RateService } from './rate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RateService = TestBed.get(RateService);
    expect(service).toBeTruthy();
  });
});
