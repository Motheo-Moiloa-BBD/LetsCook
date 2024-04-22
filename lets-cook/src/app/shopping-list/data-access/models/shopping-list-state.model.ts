import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient?: Ingredient;
  editedIngredientIndex: number;
}
