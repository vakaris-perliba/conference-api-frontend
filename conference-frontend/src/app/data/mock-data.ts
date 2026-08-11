import { SessionResponse } from '../models/api/session-response.model';
import { Track } from '../models/domain/track.model';
import { Speaker } from '../models/domain/speaker.model';

export const MOCK_TRACKS: Track[] = [
  { id: 1, name: 'Backend Development' },
  { id: 2, name: 'Frontend Development' },
  { id: 3, name: 'Cloud & DevOps' },
];

export const MOCK_SPEAKERS: Speaker[] = [
  {
    id: 1,
    name: 'Scott Hunter',
    bio: 'VP of Product for Azure Developer Experience at Microsoft.',
    webSite: 'https://twitter.com/coolcsh',
  },
  {
    id: 2,
    name: 'David Fowler',
    bio: 'Partner Software Architect on the ASP.NET team, creator of SignalR.',
    webSite: 'https://twitter.com/davidfowl',
  },
  {
    id: 3,
    name: 'Safia Abdalla',
    bio: 'Software engineer on the .NET team, working on ASP.NET Core.',
    webSite: 'https://twitter.com/captainsafia',
  },
];

export const MOCK_SESSIONS: SessionResponse[] = [
  {
    id: 1,
    title: "What's New in .NET 8",
    abstract: 'Overview of the latest .NET 8 features.',
    startTime: '2026-09-15T09:00:00+00:00',
    endTime: '2026-09-15T10:00:00+00:00',
    duration: '01:00:00',
    trackId: 1,
    track: MOCK_TRACKS[0],
    speakers: [MOCK_SPEAKERS[0]],
  },
  {
    id: 2,
    title: 'ASP.NET Core Performance Best Practices',
    abstract: 'Practical tips to make your API faster.',
    startTime: '2026-09-15T10:30:00+00:00',
    endTime: '2026-09-15T11:30:00+00:00',
    duration: '01:00:00',
    trackId: 1,
    track: MOCK_TRACKS[0],
    speakers: [MOCK_SPEAKERS[1], MOCK_SPEAKERS[2]],
  },
  {
    id: 3,
    title: 'Building Modern Web Apps with Angular',
    abstract: 'Components, templates and data flow.',
    startTime: '2026-09-16T09:00:00+00:00',
    endTime: '2026-09-16T09:45:00+00:00',
    duration: '00:45:00',
    trackId: 2,
    track: MOCK_TRACKS[1],
    speakers: [MOCK_SPEAKERS[2]],
  },
];
