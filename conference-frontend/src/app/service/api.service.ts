import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionResponse } from '../models/api/session-response.model';
import { CreateSessionRequest } from '../models/api/create-session-request.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getSessionById(id: number): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(`${this.baseUrl}/sessions/${id}`);
  }

  getSessions(): Observable<SessionResponse[]> {
    return this.http.get<SessionResponse[]>(`${this.baseUrl}/sessions`);
  }

  createSession(request: CreateSessionRequest): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(`${this.baseUrl}/sessions`, request);
  }
}
