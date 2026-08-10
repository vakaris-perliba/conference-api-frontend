import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom, of, throwError } from 'rxjs';

import { conferenceExistsGuard } from './conference-exists.guard';
import { SessionService } from '../service/session.service';
import { SessionResponse } from '../models/api/session-response.model';

describe('conferenceExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => conferenceExistsGuard(...guardParameters));

  let sessionService: { getSessionById: ReturnType<typeof vi.fn> };

  // Fake of the route the guard receives, e.g. /conferences/5 -> routeWithId('5')
  const routeWithId = (id: string) =>
    ({ paramMap: convertToParamMap({ id }) }) as ActivatedRouteSnapshot;

  const state = {} as RouterStateSnapshot;

  beforeEach(() => {
    sessionService = { getSessionById: vi.fn() };

    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: SessionService, useValue: sessionService }],
    });
  });

  it('redirects to /conferences when the id is not a number', () => {
    // Act
    const result = executeGuard(routeWithId('abc'), state) as UrlTree;

    // Assert
    expect(result).toBeInstanceOf(UrlTree);
    expect(result.toString()).toBe('/conferences');
    expect(sessionService.getSessionById).not.toHaveBeenCalled();
  });

  it('allows navigation when the conference exists', async () => {
    // Arrange
    sessionService.getSessionById.mockReturnValue(of({ id: 5 } as SessionResponse));

    // Act
    const result$ = executeGuard(routeWithId('5'), state) as Observable<boolean | UrlTree>;
    const result = await firstValueFrom(result$);

    // Assert
    expect(result).toBe(true);
    expect(sessionService.getSessionById).toHaveBeenCalledWith(5);
  });

  it('redirects to /conferences when the API returns 404', async () => {
    // Arrange
    sessionService.getSessionById.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 })),
    );

    // Act
    const result$ = executeGuard(routeWithId('999'), state) as Observable<boolean | UrlTree>;
    const result = await firstValueFrom(result$);

    // Assert
    expect(result).toBeInstanceOf(UrlTree);
    expect((result as UrlTree).toString()).toBe('/conferences');
  });
});
