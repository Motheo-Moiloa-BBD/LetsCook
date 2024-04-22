import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';

export const add = createAction(
  '[ShoppingList] Add',
  props<{ ingredient: Ingredient }>()
);

export const addMultiple = createAction(
  '[ShoppingList] AddMultiple',
  props<{ ingredients: Ingredient[] }>()
);

export const update = createAction(
  '[ShoppingList] update',
  props<{ ingredient: Ingredient }>()
);

export const remove = createAction('[ShoppingList] Remove');

export const startEdit = createAction(
  '[ShoppingList] StartEdit',
  props<{ index: number }>()
);

export const stopEdit = createAction('[ShoppingList] StopEdit');
