import { Injectable, computed, signal } from '@angular/core';
import { CreateSessionRequest } from '../models/api/create-session-request.model';

@Injectable({
  providedIn: 'root',
})
export class ConferenceStateService {
  private readonly _draft = signal<CreateSessionRequest>({ title: '' });

  readonly draft = this._draft.asReadonly();

  readonly formStatus = computed(() => {
    const title = (this._draft().title ?? '').trim();
    const abstract = (this._draft().abstract ?? '').trim();

    if (title === '' && abstract === '') return 'Empty';
    if (title === '') return 'Title is empty';
    if (abstract === '') return 'Description is empty';
    return 'Filled';
  });

  updateDraft(changes: Partial<CreateSessionRequest>): void {
    this._draft.update(draft => ({ ...draft, ...changes }));
  }

  clearDraft(): void {
    this._draft.set({ title: '' });
  }
}
