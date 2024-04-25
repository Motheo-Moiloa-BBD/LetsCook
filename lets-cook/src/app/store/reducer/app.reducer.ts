import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from 'src/app/auth/data-access/store/reducer/auth.reducer';
import { shoppingListReducer } from 'src/app/shopping-list/data-access/store/reducer/shopping-list.reducer';
import { AppState } from '../app-state.model';
import { recipeBookReducer } from 'src/app/recipe-book/data-access/store/reducer/recipe-book.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipeBook: recipeBookReducer
};
