import { Component, Input } from '@angular/core';
import { Recipe } from '../../data-access/models/recipe.model';
import { RecipeService } from '../../data-access/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private receipeService: RecipeService) {
    this.recipe = {
      id: 0,
      name: '',
      description: '',
      imagePath: '',
      ingredients: [
        {
          name: '',
          amount: 0,
        },
      ],
    };
  }
}
