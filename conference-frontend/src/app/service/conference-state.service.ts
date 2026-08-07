import { Injectable, signal } from '@angular/core';

export type SubmitStatus = 'idle' | 'saving' | 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ConferenceStateService {

  private readonly _submitStatus = signal<SubmitStatus>('idle');
  readonly submitStatus = this._submitStatus.asReadonly();

  setSubmitStatus(status: SubmitStatus): void {
    this._submitStatus.set(status);
    if(status === 'success')
    {
      setTimeout(() => {
        if(this._submitStatus() === 'success') this._submitStatus.set('idle');
      }, 3000);
    }
  }
}
