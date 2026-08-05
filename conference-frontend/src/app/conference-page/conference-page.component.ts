import { Component, OnInit, inject } from '@angular/core';
import { SessionResponse } from '../models/api/session-response.model';
import { SessionService } from '../service/session.service';
import { CreateSessionRequest } from '../models/api/create-session-request.model';

@Component({
  selector: 'app-conference-page',
  standalone: false,
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.css',
})
export class ConferencePageComponent implements OnInit {
  sessions: SessionResponse[] = [];

  private readonly sessionService = inject(SessionService);


  ngOnInit(): void{
    this.sessions = this.sessionService.getSessions();
  }

  onSessionSaved(request: CreateSessionRequest): void{
    this.sessionService.addSession(request);
    this.sessions = [...this.sessionService.getSessions()];
  }
}
