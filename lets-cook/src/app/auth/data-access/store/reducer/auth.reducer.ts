import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../models/auth-state.model';
import {
  authenticationSuccess,
  authenticationFail,
  signInStart,
  signOut,
  signUpStart,
  clearError,
} from '../action/auth.actions';

export const initialState: AuthState = {
  user: undefined,
  authError: undefined,
  loading: false,
};

export const authReducer = createReducer(
  initialState,

  on(
    authenticationSuccess,
    (state, { user }): AuthState => ({
      ...state,
      user: user,
      authError: undefined,
      loading: false,
    })
  ),

  on(
    authenticationFail,
    (state, { errorMessage }): AuthState => ({
      ...state,
      user: undefined,
      authError: errorMessage,
      loading: false,
    })
  ),

  on(
    signInStart,
    signUpStart,
    (state): AuthState => ({
      ...state,
      authError: undefined,
      loading: true,
    })
  ),

  on(
    signOut,
    (state): AuthState => ({
      ...state,
      user: undefined,
    })
  ),

  on(
    clearError,
    (state): AuthState => ({
      ...state,
      authError: undefined,
    })
  )
);
