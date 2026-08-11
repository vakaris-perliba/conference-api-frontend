import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { SessionService } from '../service/session.service';

export const conferenceExistsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionService = inject(SessionService);

  const id = Number(route.paramMap.get('id'));

  if (Number.isNaN(id)) {
    return router.createUrlTree(['/conferences']);
  }

  return sessionService.getSessionById(id).pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/conferences'])))
  );
};
