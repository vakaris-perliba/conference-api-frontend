import { Component, effect, inject } from '@angular/core';
import { CreateSessionRequest } from '../../models/api/create-session-request.model';
import { SessionService } from '../../service/session.service';
import { ConferenceStateService } from '../../service/conference-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference-create-page',
  standalone: false,
  templateUrl: './conference-create-page.component.html',
  styleUrl: './conference-create-page.component.css',
})
export class ConferenceCreatePageComponent {
  private readonly sessionService = inject(SessionService);
  readonly state = inject(ConferenceStateService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.state.submitStatus() === 'success') {
        setTimeout(() => this.router.navigate(['/conferences']), 2000);
      }
    });
  }

  onSessionSaved(request: CreateSessionRequest): void{
    this.sessionService.addSession(request);
  }
}
