import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from 'src/app/recipe-book/data-access/models/recipe.model';
import { RecipeService } from 'src/app/recipe-book/data-access/services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes(): Observable<Recipe[]> {
    const recipes = this.recipeService.getRecipes();

    return this.http.put<Recipe[]>(
      `https://letscook-server-81a77-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`,
      recipes
    );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        `https://letscook-server-81a77-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
