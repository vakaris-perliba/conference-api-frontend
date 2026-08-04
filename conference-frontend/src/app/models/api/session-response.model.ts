import { Session } from '../domain/session.model';
import { Track } from '../domain/track.model';
import { Speaker } from '../domain/speaker.model';

// Ka grazina GET /api/sessions - sesija kartu su track'u ir pranesejais.
// Atitinka backend'o SessionResponse (Session + Track + Speakers).
export interface SessionResponse extends Session {
  track: Track;
  speakers: Speaker[];
}
