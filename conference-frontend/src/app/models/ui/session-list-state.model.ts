import { SessionResponse } from '../api/session-response.model';

export type SessionListState =
  | { status: 'loading' }
  | { status: 'loaded'; sessions: SessionResponse[] }
  | { status: 'error'; error: string };
