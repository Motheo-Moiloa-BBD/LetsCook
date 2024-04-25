import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipeBookState } from "../../models/recipe-book-state.model";
import { Recipe } from "../../models/recipe.model";

//Get complete auth state
export const selectAuthState = createFeatureSelector<RecipeBookState>('recipeBook');

export const selectRecipes = createSelector(selectAuthState, (state: RecipeBookState) => state.recipes);

export const selectRecipeById = (id: number) => createSelector(selectRecipes, (recipes: Recipe[]) => 
    recipes.find(recipe => recipe.id === id)
)