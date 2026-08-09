import { Component, EventEmitter, Output, effect, inject } from '@angular/core';
import { CreateSessionRequest } from '../../../models/api/create-session-request.model';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ConferenceStateService } from '../../../service/conference-state.service';


function endAfterStart(group: AbstractControl): ValidationErrors | null {
  const { startTime, endTime } = group.value;
  return startTime && endTime && endTime <= startTime
    ? { endBeforeStart: true }
    : null;
}

@Component({
  selector: 'app-session-form',
  standalone: false,
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.css',
})
export class SessionFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly state = inject(ConferenceStateService);
  constructor(){
    effect(() => {
      if(this.state.submitStatus() === 'success')
      {
        this.form.reset();
      }
    })
  }

  readonly form = this.formBuilder.nonNullable.group(
    {
      title: ['', Validators.required],
      abstract: [''],
      startTime: [''],
      endTime: ['']
    },
    { validators: endAfterStart }
  );

  @Output() saved = new EventEmitter<CreateSessionRequest>();

  onSubmit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    const today = new Date().toISOString().slice(0, 10);
    const toIso = (time: string) => time ? `${today}T${time}` : undefined;

    this.saved.emit({
      ...value,
      startTime: toIso(value.startTime),
      endTime: toIso(value.endTime),
    });
  }
}
