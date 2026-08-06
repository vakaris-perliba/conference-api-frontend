import { Injectable } from '@angular/core';
import { SessionResponse } from '../models/api/session-response.model';
import { MOCK_SESSIONS, MOCK_SPEAKERS } from '../data/mock-data';
import { CreateSessionRequest } from '../models/api/create-session-request.model';
import { MOCK_TRACKS } from '../data/mock-data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private readonly sessionsSubject = new BehaviorSubject<SessionResponse[]>(MOCK_SESSIONS);
  readonly sessions$: Observable<SessionResponse[]> = this.sessionsSubject.asObservable();

  addSession(request: CreateSessionRequest): void
  {
    const newSession: SessionResponse = {
      id: this.sessionsSubject.value.length + 1,
      title: request.title,
      abstract: request.abstract,
      duration: '01:00:00',
      track: MOCK_TRACKS[0],
      speakers: MOCK_SPEAKERS
    };
    this.sessionsSubject.next([...this.sessionsSubject.value, newSession]);
  }
}
