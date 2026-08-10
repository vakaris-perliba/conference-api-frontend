import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  const request = new HttpRequest('GET', '/api/sessions');

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('passes successful responses through untouched', () => {
    // Arrange
    const response = new HttpResponse({ status: 200 });
    const next = () => of(response as HttpEvent<unknown>);
    let received: HttpEvent<unknown> | undefined;

    // Act
    interceptor(request, next).subscribe((event) => (received = event));

    // Assert
    expect(received).toBe(response);
  });

  it('maps status 0 to a "backend not running" message', () => {
    // Arrange
    const next = () => throwError(() => new HttpErrorResponse({ status: 0 }));
    let captured: Error | undefined;

    // Act
    interceptor(request, next).subscribe({ error: (err: Error) => (captured = err) });

    // Assert
    expect(captured?.message).toBe('Cannot reach the server. Is the backend running?');
  });

  it('maps other errors to a message with the status code', () => {
    // Arrange
    const next = () => throwError(() => new HttpErrorResponse({ status: 500 }));
    let captured: Error | undefined;

    // Act
    interceptor(request, next).subscribe({ error: (err: Error) => (captured = err) });

    // Assert
    expect(captured?.message).toBe('Server error (500).');
  });
});
