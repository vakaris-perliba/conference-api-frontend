import { Component, Input } from '@angular/core';
import { SessionResponse } from '../models/api/session-response.model';

@Component({
  selector: 'app-session-card',
  standalone: false,
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css',
})
export class SessionCardComponent {
  @Input({ required: true }) session!: SessionResponse;
}
