import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../models/auth-state.model';
import { signIn, signOut } from '../action/auth.actions';

export const initialState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(
    signIn,
    (state, { user }): AuthState => ({
      ...state,
      user: user,
    })
  ),

  on(
    signOut,
    (state): AuthState => ({
      ...state,
      user: undefined,
    })
  )
);
