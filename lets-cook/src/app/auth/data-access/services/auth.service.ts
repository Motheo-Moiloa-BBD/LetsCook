import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authenticationSuccess, signOut } from '../store/action/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private store: Store) {}

  signOut() {
    this.store.dispatch(signOut());
  }

  setUser(user: User) {
    this.store.dispatch(authenticationSuccess({ user }));

    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | undefined {
    const user: string | null = localStorage.getItem('user');

    if (user) {
      const loggedInUser: User = JSON.parse(user);
      return loggedInUser;
    }

    return undefined;
  }

  autoLogin() {
    const loggedInUser = this.getUser();

    if (loggedInUser) {
      const expiresIn = new Date(loggedInUser.tokenExpirationDate).getTime();
      const currentTime = new Date().getTime();

      if (expiresIn < currentTime) {
        this.signOut();
        this.router.navigate(['/auth']);
      }

      this.store.dispatch(authenticationSuccess({ user: loggedInUser }));
    }
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let message = 'An unknown error occured!';
    if (errorResponse.status === 0) {
      message = `Error: ${errorResponse.message}`;
    } else {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          message = 'The email address is already in use by another account.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          message = 'Password sign-in is disabled..';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message =
            'All requests have been blocked from this device due to unusual activity. Try again later.';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          message = 'Invalid email address or password.';
          break;
        case 'USER_DISABLED':
          message = 'The user account has been disabled by an administrator.';
          break;
      }
    }
    return throwError(() => new Error(message));
  }
}
