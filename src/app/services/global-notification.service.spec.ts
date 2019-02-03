import { TestBed } from '@angular/core/testing';

import { GlobalNotificationService } from './global-notification.service';

describe('GlobalNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalNotificationService = TestBed.get(GlobalNotificationService);
    expect(service).toBeTruthy();
  });
});
