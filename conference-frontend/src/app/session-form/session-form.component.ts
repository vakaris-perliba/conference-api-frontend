import { Component } from '@angular/core';
import {CreateSessionRequest} from "../models/session.model";

@Component({
  selector: 'app-session-form',
  standalone: false,
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.css',
})
export class SessionFormComponent {
  model: CreateSessionRequest = { title: '' };
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
