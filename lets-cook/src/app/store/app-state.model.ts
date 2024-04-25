import { AuthState } from 'src/app/auth/data-access/models/auth-state.model';
import { ShoppingListState } from 'src/app/shopping-list/data-access/models/shopping-list-state.model';
import { RecipeBookState } from '../recipe-book/data-access/models/recipe-book-state.model';

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipeBook: RecipeBookState
}
