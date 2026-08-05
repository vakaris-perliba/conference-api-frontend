import { Component, EventEmitter, Output } from '@angular/core';
import { CreateSessionRequest } from '../models/api/create-session-request.model';

@Component({
  selector: 'app-session-form',
  standalone: false,
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.css',
})
export class SessionFormComponent {
  model: CreateSessionRequest = { title: '' };

  @Output() saved = new EventEmitter<CreateSessionRequest>();

  onSubmit(): void {
    this.saved.emit({...this.model});
  }
}
