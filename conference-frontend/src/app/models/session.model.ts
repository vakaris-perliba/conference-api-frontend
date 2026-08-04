export interface Session {
  id : number;
  title : string;
  abstract? : string;
  startTime? : string;
  endTime? : string;
  readonly duration : string;
  trackId? : number;
}

export interface CreateSessionRequest {
  title : string;
  abstract? : string;
  startTime? : string;
  endTime? : string;
  trackId? : number;
}
