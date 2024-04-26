import { createReducer, on } from '@ngrx/store';
import { RecipeBookState } from '../../models/recipe-book-state.model';
import { addRecipe, deleteRecipe, setRecipes, updateRecipe } from '../action/recipe-book.actions';

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
  ),

  on(
    addRecipe,
    (state, { recipe }): RecipeBookState => ({
      ...state,
      recipes: [...state.recipes, recipe]
    })
  ),

  on(
    updateRecipe,
    (state, { id , updatedRecipe }): RecipeBookState => ({
      ...state,
      recipes: state.recipes.map((recipe) => {
        if(recipe.id === id){
          return updatedRecipe
        }
        return recipe;
      })
    })
  ),

  on(
    deleteRecipe,
    (state, { id }): RecipeBookState => ({
      ...state,
      recipes: state.recipes.filter((recipe) => {
        return recipe.id !== id;
      })
    })
  ),
);
