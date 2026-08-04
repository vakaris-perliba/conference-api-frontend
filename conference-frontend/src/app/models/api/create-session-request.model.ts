// Ka siunciame i POST /api/sessions kurdami nauja sesija.
// Be id ir duration - juos sukuria serveris.
export interface CreateSessionRequest {
  title: string;
  abstract?: string;
  startTime?: string;
  endTime?: string;
  trackId?: number;
}
