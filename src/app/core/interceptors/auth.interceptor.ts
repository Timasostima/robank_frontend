import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {environment} from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // For endpoints that don't require authentication
  const publicEndpoints = [
    '/user/register',
    '/check-new-user'
  ];

  if (publicEndpoints.some(url => req.url.includes(environment.apiUrl + url))) {
    return next(req);
  }

  return from(authService.getToken()).pipe(
    switchMap(token => {
      if (token) {
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
      }
      return next(req);
    })
  );
};
