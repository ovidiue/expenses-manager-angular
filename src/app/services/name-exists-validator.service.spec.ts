import { TestBed } from '@angular/core/testing';

import { NameExistsValidatorService } from './name-exists-validator.service';

describe('NameExistsValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NameExistsValidatorService = TestBed.get(NameExistsValidatorService);
    expect(service).toBeTruthy();
  });
});
