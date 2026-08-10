import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    // Arrange (shared by every test)
    pipe = new DurationPipe();
  });

  it('shows only minutes when the duration is under an hour', () => {
    expect(pipe.transform('00:45:00')).toBe('45 min');
  });

  it('shows only hours when minutes are zero', () => {
    expect(pipe.transform('02:00:00')).toBe('2 h');
  });

  it('shows hours and minutes together', () => {
    expect(pipe.transform('01:30:00')).toBe('1 h 30 min');
  });

  it('converts days into hours (.NET d.hh:mm:ss format)', () => {
    expect(pipe.transform('1.02:30:00')).toBe('26 h 30 min');
  });

  it('keeps the minus sign for negative durations', () => {
    expect(pipe.transform('-00:45:00')).toBe('-45 min');
  });
});
