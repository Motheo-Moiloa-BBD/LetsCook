import { createAction, props } from "@ngrx/store";
import { Recipe } from "../../models/recipe.model";

export const setRecipes = createAction('[Recipe Book] Set Recipes', props<{recipes: Recipe[]}>())