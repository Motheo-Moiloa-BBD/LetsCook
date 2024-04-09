import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
