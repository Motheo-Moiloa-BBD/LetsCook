import { Component, Input } from '@angular/core';
import { Recipe } from '../../data-access/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor() {
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
