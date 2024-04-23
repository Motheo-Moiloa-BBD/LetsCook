import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth-state.model';

//Get complete auth state
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
