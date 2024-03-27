import { Component } from '@angular/core';
import { Recipe } from '../../data-access/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath:
        'https://vilas.extension.wisc.edu/files/2013/12/Recipes-Title.png',
    },
    {
      name: 'A Test Recipe 2',
      description: 'This is simply a test 2',
      imagePath:
        'https://vilas.extension.wisc.edu/files/2013/12/Recipes-Title.png',
    },
  ];
}
