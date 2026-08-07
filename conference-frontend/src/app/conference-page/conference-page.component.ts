import { Component, inject, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { CreateSessionRequest } from '../models/api/create-session-request.model';
import { ConferenceStateService } from '../service/conference-state.service';

@Component({
  selector: 'app-conference-page',
  standalone: false,
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.css',
})

export class ConferencePageComponent implements OnInit {
  private readonly sessionService = inject(SessionService);
  readonly state = inject(ConferenceStateService);

  readonly listState$ = this.sessionService.listState$;

  onSessionSaved(request: CreateSessionRequest): void{
    this.sessionService.addSession(request);
  }

  ngOnInit(): void {
    this.sessionService.loadSessions();
  }
}
