// Ka grazina API skaitant sesija.
export interface Session {
  id: number;
  title: string;
  abstract?: string;
  startTime?: string;
  endTime?: string;
  readonly duration: string;
  trackId?: number;
}
