import { Component } from '@angular/core';
import { DataStorageService } from '../../data-access/services/data-storage.service';
import { Recipe } from 'src/app/recipe-book/data-access/models/recipe.model';
import { RecipeService } from 'src/app/recipe-book/data-access/services/recipe.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  collapsed = true;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  onSaveData() {
    this.dataStorageService.saveRecipes().subscribe((recipes: Recipe[]) => {
      console.log(recipes);
    });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
