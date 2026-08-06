import { Component, inject } from '@angular/core';
import { SessionResponse } from '../models/api/session-response.model';
import { SessionService } from '../service/session.service';
import { CreateSessionRequest } from '../models/api/create-session-request.model';
import { ConferenceStateService } from '../service/conference-state.service';

@Component({
  selector: 'app-conference-page',
  standalone: false,
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.css',
})

export class ConferencePageComponent {
  private readonly sessionService = inject(SessionService);
  readonly state = inject(ConferenceStateService);

  readonly sessions$ = this.sessionService.sessions$;

  onSessionSaved(request: CreateSessionRequest): void{
    this.sessionService.addSession(request);
  }
}
