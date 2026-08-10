import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { SessionService } from './session.service';
import { ApiService } from './api.service';
import { ConferenceStateService } from './conference-state.service';
import { SessionResponse } from '../models/api/session-response.model';
import { SessionListState } from '../models/ui/session-list-state.model';
import { CreateSessionRequest } from '../models/api/create-session-request.model';

describe('SessionService', () => {
  let service: SessionService;
  let api: {
    getSessions: ReturnType<typeof vi.fn>;
    createSession: ReturnType<typeof vi.fn>;
    getSessionById: ReturnType<typeof vi.fn>;
  };
  let state: { setSubmitStatus: ReturnType<typeof vi.fn> };

  const session = (id: number, title: string) => ({ id, title }) as SessionResponse;
  const request: CreateSessionRequest = { title: 'New talk' };

  // BehaviorSubject emits its current value on subscribe, so this reads it synchronously.
  const currentListState = (): SessionListState => {
    let value!: SessionListState;
    service.listState$.subscribe((s) => (value = s)).unsubscribe();
    return value;
  };

  beforeEach(() => {
    api = { getSessions: vi.fn(), createSession: vi.fn(), getSessionById: vi.fn() };
    state = { setSubmitStatus: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: api },
        { provide: ConferenceStateService, useValue: state },
      ],
    });
    service = TestBed.inject(SessionService);
  });

  it('starts in loading state', () => {
    expect(currentListState()).toEqual({ status: 'loading' });
  });

  it('emits loaded state with sessions when the API succeeds', () => {
    // Arrange
    const sessions = [session(1, 'Intro'), session(2, 'Advanced')];
    api.getSessions.mockReturnValue(of(sessions));

    // Act
    service.loadSessions();

    // Assert
    expect(currentListState()).toEqual({ status: 'loaded', sessions });
  });

  it('emits error state with the message when the API fails', () => {
    // Arrange
    api.getSessions.mockReturnValue(throwError(() => new Error('Server error (500).')));

    // Act
    service.loadSessions();

    // Assert
    expect(currentListState()).toEqual({ status: 'error', error: 'Server error (500).' });
  });

  it('appends the created session and reports success', () => {
    // Arrange: start from a loaded list with one session
    api.getSessions.mockReturnValue(of([session(1, 'Intro')]));
    service.loadSessions();
    const created = session(2, 'New talk');
    api.createSession.mockReturnValue(of(created));

    // Act
    service.addSession(request);

    // Assert
    expect(api.createSession).toHaveBeenCalledWith(request);
    expect(currentListState()).toEqual({
      status: 'loaded',
      sessions: [session(1, 'Intro'), created],
    });
    expect(state.setSubmitStatus).toHaveBeenCalledWith('saving');
    expect(state.setSubmitStatus).toHaveBeenCalledWith('success');
  });

  it('reports error status when creating a session fails', () => {
    // Arrange
    api.createSession.mockReturnValue(throwError(() => new Error('Server error (500).')));

    // Act
    service.addSession(request);

    // Assert
    expect(state.setSubmitStatus).toHaveBeenCalledWith('saving');
    expect(state.setSubmitStatus).toHaveBeenCalledWith('error');
  });
});
