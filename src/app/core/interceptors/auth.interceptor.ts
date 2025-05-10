import {inject} from '@angular/core';
import {HttpInterceptorFn} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {environment} from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  console.log('in Interceptor');

  // Para los endpoints que no requieren autenticación
  const publicUrls = [
    '/api/user/register',
  ];

  if (publicUrls.some(url => req.url.includes(environment.apiUrl + url))) {
    console.log('Public URL:', req.url);
    return next(req);
  }
  console.log('Private URL:', req.url);

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
