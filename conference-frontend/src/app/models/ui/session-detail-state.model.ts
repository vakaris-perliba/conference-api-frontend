import { SessionResponse } from '../api/session-response.model';

export type SessionDetailState =
  | { status: 'loading' }
  | { status: 'loaded'; session: SessionResponse }
  | { status: 'error'; error: string };
