import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  console.log('in Interceptor');

  // Para los endpoints que no requieren autenticación
  const publicUrls = [
    '/api/token/',
    '/api/register/',
  ];

  if (publicUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  return from(authService.getToken()).pipe(
    switchMap(token => {
      console.log('Token:', token);
      if (token) {
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
      }
      return next(req);
    })
  );
};
