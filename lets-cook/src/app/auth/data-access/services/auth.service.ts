import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(userDetails: Auth): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYtFeSoEOMxXv8j_Qu3DmiEUGQqdDf0iI`,
        { ...userDetails, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  signIn(userDetails: Auth): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYtFeSoEOMxXv8j_Qu3DmiEUGQqdDf0iI`,
        { ...userDetails, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
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
