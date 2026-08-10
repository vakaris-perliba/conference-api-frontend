import { Component, inject, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-conference-page',
  standalone: false,
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.css',
})
export class ConferencePageComponent implements OnInit {
  private readonly sessionService = inject(SessionService);

  readonly listState$ = this.sessionService.listState$;

  ngOnInit(): void {
    this.sessionService.loadSessions();
  }
}
