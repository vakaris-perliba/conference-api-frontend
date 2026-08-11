import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../service/session.service';
import { SessionDetailState } from '../../models/ui/session-detail-state.model';

@Component({
  selector: 'app-conference-detail-page',
  standalone: false,
  templateUrl: './conference-detail-page.component.html',
  styleUrl: './conference-detail-page.component.css',
})
export class ConferenceDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly sessionService = inject(SessionService);
  readonly state = signal<SessionDetailState>({ status: 'loading' });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sessionService.getSessionById(id).subscribe({
      next: (session) => this.state.set({ status: 'loaded', session }),
      error: (err: Error) => this.state.set({ status: 'error', error: err.message }),
    });
  }
}
