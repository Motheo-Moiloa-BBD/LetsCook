import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Auth } from '../../models/auth.model';

export const authenticationSuccess = createAction(
  '[Auth] Authentication Success',
  props<{ user: User, redirect: boolean }>()
);

export const authenticationFail = createAction(
  '[Auth] Authentication Fail',
  props<{ errorMessage: string }>()
);

export const signUpStart = createAction(
  '[Auth] SignUp Start',
  props<{ userDetails: Auth }>()
);

export const signUp = createAction('[Auth] SignUp', props<{ user: User }>());

export const signInStart = createAction(
  '[Auth] SignIn Start',
  props<{ userDetails: Auth }>()
);

export const signOut = createAction('[Auth] SignOut');

export const clearError = createAction('[Auth] Clear Error');

export const autoLogin = createAction('[Auth] Auto Login');
