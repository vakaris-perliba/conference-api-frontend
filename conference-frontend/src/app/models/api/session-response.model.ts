import { Session } from '../domain/session.model';
import { Track } from '../domain/track.model';
import { Speaker } from '../domain/speaker.model';

export interface SessionResponse extends Session {
  track: Track;
  speakers: Speaker[];
}
