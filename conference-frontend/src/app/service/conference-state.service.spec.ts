import { TestBed } from '@angular/core/testing';

import { ConferenceStateService } from './conference-state.service';

describe('ConferenceStateService', () => {
  let service: ConferenceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferenceStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
