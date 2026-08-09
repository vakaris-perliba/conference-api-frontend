import { Injectable, inject } from '@angular/core';
import { CreateSessionRequest } from '../models/api/create-session-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ConferenceStateService } from './conference-state.service';
import { SessionListState } from '../models/ui/session-list-state.model';
import { SessionResponse } from '../models/api/session-response.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly api = inject(ApiService);
  private readonly state = inject(ConferenceStateService);

  private readonly listStateSubject = new BehaviorSubject<SessionListState>({ status: 'loading' });
  readonly listState$: Observable<SessionListState> = this.listStateSubject.asObservable();

  loadSessions(): void {
    this.listStateSubject.next({ status: 'loading' });
    this.api.getSessions().subscribe({
      next: (sessions) => this.listStateSubject.next({ status: 'loaded', sessions }),
      error: (err: Error) => this.listStateSubject.next({ status: 'error', error: err.message }),
    });
  }

  addSession(request: CreateSessionRequest): void
  {
    this.state.setSubmitStatus('saving');
    this.api.createSession(request).subscribe(
      {
        next: (created) =>
        {
          const current = this.listStateSubject.value;
          if (current.status === 'loaded')
            {
            this.listStateSubject.next({ status: 'loaded', sessions: [...current.sessions, created] });
          }
          this.state.setSubmitStatus('success');
        },
        error: () => this.state.setSubmitStatus('error'),
    });
  }

  getSessionById(id: number): Observable<SessionResponse> {
    return this.api.getSessionById(id);
  }
}
