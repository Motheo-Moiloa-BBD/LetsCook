import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../data-access/services/auth.service';
import { inject } from '@angular/core';
import { User } from '../../data-access/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../data-access/store/selector/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const store: Store = inject(Store);
  let user: User | undefined;

  store.select(selectUser).subscribe((currentUser) => {
    user = currentUser;
  });

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
