import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.status === 0
          ? 'Cannot reach the server. Is the backend running?'
          : `Server error (${error.status}).`;
      return throwError(() => new Error(message));
    }),
  );
};
