import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(userDetails: Auth): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        { ...userDetails, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  signIn(userDetails: Auth): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        { ...userDetails, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponse) => {
          const expirationDate: Date = new Date(
            new Date().getTime() +
              Number.parseInt(responseData.expiresIn) * 1000
          );
          const user: User = {
            id: responseData.localId,
            email: responseData.email,
            token: responseData.idToken,
            tokenExpirationDate: expirationDate,
          };

          this.setUser(user);
        })
      );
  }

  signOut() {
    localStorage.clear();
    this.$user.next(undefined);
    this.router.navigate(['/auth']);
  }

  setUser(user: User) {
    this.$user.next(user);

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

      this.setUser(loggedInUser);
    }
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
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
