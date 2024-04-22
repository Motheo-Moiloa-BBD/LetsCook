import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingListState } from '../../models/shopping-list-state.model';
import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';

//Get complete state of the shopping list ingredients
export const selectShoppingListState =
  createFeatureSelector<ShoppingListState>('shoppingList');

export const selectIngredients = createSelector(
  selectShoppingListState,
  (state: ShoppingListState) => state.ingredients
);

export const selectIngredientByIndex = (index: number) =>
  createSelector(
    selectIngredients,
    (ingredients: Ingredient[]) => ingredients[index]
  );
