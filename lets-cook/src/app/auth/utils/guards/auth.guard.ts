import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { User } from '../../data-access/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../data-access/store/selector/auth.selectors';
import { signOut } from '../../data-access/store/action/auth.actions';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store = inject(Store);

  let user: User | undefined;

  store.select(selectUser).subscribe((loggedInUser) => {
    user = loggedInUser;
  });

  if (user) {
    const expiresIn = new Date(user.tokenExpirationDate).getTime();
    const currentTime = new Date().getTime();

    if (expiresIn < currentTime) {
      store.dispatch(signOut());
      return router.createUrlTree(['/auth'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      return true;
    }
  } else {
    return router.createUrlTree(['/auth'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
