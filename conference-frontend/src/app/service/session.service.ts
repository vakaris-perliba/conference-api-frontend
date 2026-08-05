import { Injectable } from '@angular/core';
import { SessionResponse } from '../models/api/session-response.model';
import { MOCK_SESSIONS, MOCK_SPEAKERS } from '../data/mock-data';
import { CreateSessionRequest } from '../models/api/create-session-request.model';
import { MOCK_TRACKS } from '../data/mock-data';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessions: SessionResponse[] = MOCK_SESSIONS;

  getSessions(): SessionResponse[]
  {
    return this.sessions;
  }

  addSession(request: CreateSessionRequest): void
  {
    const newSession: SessionResponse = {
      id: this.sessions.length + 1,
      title: request.title,
      abstract: request.abstract,
      duration: '01:00:00',
      track: MOCK_TRACKS[0],
      speakers: MOCK_SPEAKERS
    };
    this.sessions.push(newSession);
  }
}
