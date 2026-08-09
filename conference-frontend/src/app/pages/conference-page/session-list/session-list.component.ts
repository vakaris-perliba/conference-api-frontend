import { Component, Input } from '@angular/core';
import { SessionResponse } from '../../../models/api/session-response.model';

@Component({
  selector: 'app-session-list',
  standalone: false,
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.css',
})
export class SessionListComponent {
  @Input() sessions: SessionResponse[] = [];
}
