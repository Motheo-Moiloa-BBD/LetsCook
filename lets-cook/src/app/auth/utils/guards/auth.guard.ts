import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
//import { User } from '../../data-access/models/user.model';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../../data-access/store/selector/auth.selectors';
import { map, take } from 'rxjs';
//import { signOut } from '../../data-access/store/action/auth.actions';
//import { selectAuthState } from '../../data-access/store/selector/auth.selectors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const store: Store = inject(Store);
  // let user: User | undefined;

  // store.select(selectAuthState).subscribe((authState) => {
  //   user = authState.user;
  // });

  // if (user) {
  //   const expiresIn = new Date(user.tokenExpirationDate).getTime();
  //   const currentTime = new Date().getTime();

  //   if (expiresIn < currentTime) {
  //     store.dispatch(signOut());
  //     return router.createUrlTree(['/auth'], {
  //       queryParams: { returnUrl: state.url },
  //     });
  //   } else {
  //     return true;
  //   }
  // } else {
  //   store.dispatch(signOut());
  //   return router.createUrlTree(['/auth'], {
  //     queryParams: { returnUrl: state.url },
  //   });
  // }
  return store.select(selectAuthState).pipe(
    take(1),
    map((authState) => {
      return authState.user;
    }),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
    // tap(isAuth => {
    //   if (!isAuth) {
    //     this.router.navigate(['/auth']);
    //   }
    // })
  );
};
