import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return from(authService.waitForAuthState()).pipe(
    switchMap(() => authService.isLoggedIn$),
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        console.warn('Auth Guard - Not logged in, redirecting to /login');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
