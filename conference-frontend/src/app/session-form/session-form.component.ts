import { Component, EventEmitter, Output, effect, inject } from '@angular/core';
import { CreateSessionRequest } from '../models/api/create-session-request.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ConferenceStateService } from '../service/conference-state.service';

@Component({
  selector: 'app-session-form',
  standalone: false,
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.css',
})
export class SessionFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly state = inject(ConferenceStateService);
  constructor() {
    effect(() => {
      if (this.state.submitStatus() === 'success') {
        this.form.reset();
      }
    });
  }

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    abstract: [''],
  });

  @Output() saved = new EventEmitter<CreateSessionRequest>();

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saved.emit({ ...this.form.getRawValue() });
  }
}
