import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../data-access/services/auth.service';
import { inject } from '@angular/core';
import { User } from '../../data-access/models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const user: User | undefined = authService.getUser();

  if (user) {
    const expiresIn = new Date(user.tokenExpirationDate).getTime();
    const currentTime = new Date().getTime();

    if (expiresIn < currentTime) {
      authService.signOut();
      return router.createUrlTree(['/auth'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      return true;
    }
  } else {
    authService.signOut();
    return router.createUrlTree(['/auth'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
