import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const signIn = createAction('[Auth] SignIn', props<{ user: User }>());

export const signOut = createAction('[Auth] SignOut');
