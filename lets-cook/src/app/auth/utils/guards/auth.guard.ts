import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { User } from '../../data-access/models/user.model';
import { Store } from '@ngrx/store';
import { signOut } from '../../data-access/store/action/auth.actions';
import { selectAuthState } from '../../data-access/store/selector/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store = inject(Store);
  let user: User | undefined;

  store.select(selectAuthState).subscribe((authState) => {
    user = authState.user;
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
    store.dispatch(signOut());
    return router.createUrlTree(['/auth'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
