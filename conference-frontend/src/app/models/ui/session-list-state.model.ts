import { Session } from '../domain/session.model';

export type SessionListState =
  | { status: 'loading' }
  | { status: 'loaded'; sessions: Session[] }
  | { status: 'error'; error: string };
