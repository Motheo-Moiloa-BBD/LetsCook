import { createReducer, on } from '@ngrx/store';
import { RecipeBookState } from '../../models/recipe-book-state.model';
import { setRecipes } from '../action/recipe-book.actions';

export const initialState: RecipeBookState = {
  recipes: [],
};

export const recipeBookReducer = createReducer(initialState, 

  on(
    setRecipes,
    (state, { recipes }): RecipeBookState => ({
      ...state,
      recipes: [...recipes]
    })
  )
);
