import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/data-access/services/shopping-list.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanges: Subject<Recipe[]> = new Subject();
  // private recipes: Recipe[] = [
  //   {
  //     id: 1,
  //     name: 'Tasty Schnitzel',
  //     description: 'A super-tasty Schnitzel - just awesome!',
  //     imagePath:
  //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ingredients: [
  //       {
  //         name: 'Meat',
  //         amount: 1,
  //       },
  //       {
  //         name: 'French Fries',
  //         amount: 20,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Big Fat Burger',
  //     description: 'What else you need to say?',
  //     imagePath:
  //       'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     ingredients: [
  //       {
  //         name: 'Buns',
  //         amount: 2,
  //       },
  //       {
  //         name: 'Beef patty',
  //         amount: 1,
  //       },
  //     ],
  //   },
  // ];

  private recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addingredients(ingredients);
    this.router.navigateByUrl('/shopping-list');
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateReceipe(id: number, newRecipe: Recipe) {
    this.recipes[
      this.recipes.indexOf(this.recipes.find((recipe) => recipe.id === id)!)
    ] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(
      this.recipes.indexOf(this.recipes.find((recipe) => recipe.id === id)!),
      1
    );
    this.recipesChanges.next(this.recipes.slice());
  }
}
