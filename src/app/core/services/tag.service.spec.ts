import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';

describe('TagService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  );

  it('should be created', () => {
    const service: TagService = TestBed.inject(TagService);

    expect(service).toBeTruthy();
  });
});
