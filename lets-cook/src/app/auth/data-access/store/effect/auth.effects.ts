/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  authenticationSuccess,
  authenticationFail,
  signInStart,
  signUpStart,
  signOut,
  autoLogin,
} from '../action/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthResponse } from '../../models/auth-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

const handleAuthentication = (responseData: AuthResponse) => {
  const expirationDate: Date = new Date(
    new Date().getTime() + Number.parseInt(responseData.expiresIn) * 1000
  );
  const user: User = {
    id: responseData.localId,
    email: responseData.email,
    token: responseData.idToken,
    tokenExpirationDate: expirationDate,
  };
  localStorage.setItem('user', JSON.stringify(user));

  return authenticationSuccess({ user });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occured!';
  if (errorResponse.status === 0) {
    errorMessage = `Error: ${errorResponse.message}`;
  } else {
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled..';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'All requests have been blocked from this device due to unusual activity. Try again later.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid email address or password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
  }
  return of(authenticationFail({ errorMessage }));
};

@Injectable()
export class AuthEffects {
  authSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            { ...action.userDetails, returnSecureToken: true }
          )
          .pipe(
            map((responseData) => {
              return handleAuthentication(responseData);
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            { ...action.userDetails, returnSecureToken: true }
          )
          .pipe(
            map((responseData) => {
              return handleAuthentication(responseData);
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authSignOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOut),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      map(() => {
        let loggedInUser: User;
        const user: string | null = localStorage.getItem('user');

        if (user) {
          loggedInUser = JSON.parse(user);

          if (loggedInUser) {
            const expiresIn = new Date(
              loggedInUser.tokenExpirationDate
            ).getTime();
            const currentTime = new Date().getTime();

            if (expiresIn < currentTime) {
              return signOut();
            }

            return authenticationSuccess({ user: loggedInUser });
          }
          return { type: 'DUMMY' };
        }

        return { type: 'DUMMY' };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
