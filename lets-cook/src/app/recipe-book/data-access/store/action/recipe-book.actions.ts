import { createAction, props } from "@ngrx/store";
import { Recipe } from "../../models/recipe.model";

export const setRecipes = createAction('[Recipe Book] Set Recipes', props<{recipes: Recipe[]}>());

export const fetchRecipes = createAction('[Recipe Book] Fetch Recipes');

export const storeRecipes = createAction('[Recipe Book] Store Recipes');

export const addRecipe = createAction('[Recipe Book] Add Recipe', props<{recipe: Recipe}>());

export const updateRecipe = createAction('[Recipe Book] Update Recipe', props<{id: number,updatedRecipe: Recipe}>());

export const deleteRecipe = createAction('[Recipe Book] Delete Recipe', props<{id: number}>());