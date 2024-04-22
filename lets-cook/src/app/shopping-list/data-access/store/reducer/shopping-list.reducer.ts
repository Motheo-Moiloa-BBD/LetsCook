import { createReducer, on } from '@ngrx/store';
import { ShoppingListState } from '../../models/shopping-list-state.model';
import {
  add,
  addMultiple,
  remove,
  startEdit,
  stopEdit,
  update,
} from '../action/shopping-list.actions';

export const initialState: ShoppingListState = {
  ingredients: [
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ],
  editedIngredient: undefined,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(add, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient],
  })),

  on(addMultiple, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients],
  })),

  on(update, (state, { ingredient }) => ({
    ...state,
    ingredients: state.ingredients.map((item) => {
      if (state.ingredients.indexOf(item) === state.editedIngredientIndex) {
        return ingredient;
      }
      return item;
    }),
    editedIngredient: undefined,
    editedIngredientIndex: -1,
  })),

  on(remove, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((ingredient, index) => {
      return index !== state.editedIngredientIndex;
    }),
    editedIngredient: undefined,
    editedIngredientIndex: -1,
  })),

  on(startEdit, (state, { index }) => ({
    ...state,
    editedIngredient: { ...state.ingredients[index] },
    editedIngredientIndex: index,
  })),

  on(stopEdit, (state) => ({
    ...state,
    editedIngredient: undefined,
    editedIngredientIndex: -1,
  }))
);
