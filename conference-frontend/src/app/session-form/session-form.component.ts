import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CreateSessionRequest } from '../models/api/create-session-request.model';
import { ConferenceStateService } from '../service/conference-state.service';

@Component({
  selector: 'app-session-form',
  standalone: false,
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.css',
})
export class SessionFormComponent {
  private readonly state = inject(ConferenceStateService);

  readonly draft = this.state.draft;

  @Output() saved = new EventEmitter<CreateSessionRequest>();

  onTitleChange(value: string): void{
    this.state.updateDraft({ title: value });
  }

  onAbstractChange(value: string): void{
    this.state.updateDraft({ abstract: value });
  }

  onSubmit(): void {
    this.saved.emit({...this.state.draft()});
    this.state.clearDraft();
  }
}
