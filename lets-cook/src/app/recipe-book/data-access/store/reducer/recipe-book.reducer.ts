import { createReducer } from '@ngrx/store';
import { RecipeBookState } from '../../models/recipe-book-state.model';

export const initialState: RecipeBookState = {
  recipes: [],
};

export const recipeBookReducer = createReducer(initialState);
