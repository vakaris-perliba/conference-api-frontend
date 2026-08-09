import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { conferenceExistsGuard } from './conference-exists.guard';

describe('conferenceExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => conferenceExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
