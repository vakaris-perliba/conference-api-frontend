import { Component, OnInit } from '@angular/core';
import { SessionResponse } from '../models/api/session-response.model';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-conference-page',
  standalone: false,
  templateUrl: './conference-page.component.html',
  styleUrl: './conference-page.component.css',
})
export class ConferencePageComponent implements OnInit {
  sessions: SessionResponse[] = [];

  constructor(private sessionService: SessionService){}

  ngOnInit(): void{
    this.sessions = this.sessionService.getSessions();
  }
}
