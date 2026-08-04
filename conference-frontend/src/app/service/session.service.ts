import { Injectable } from '@angular/core';
import { SessionResponse } from '../models/api/session-response.model';
import { MOCK_SESSIONS } from '../data/mock-data';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessions: SessionResponse[] = MOCK_SESSIONS;

  getSessions(): SessionResponse[]
  {
    return this.sessions;
  }
}
