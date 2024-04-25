/* eslint-disable @ngrx/no-store-subscription */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../data-access/models/recipe.model';
import { RecipeService } from '../../data-access/services/recipe.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRecipeById } from '../../data-access/store/selector/recipe-book.selectors';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  paramSubscription?: Subscription;
  recipe?: Recipe;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = Number.parseInt(params['id']);
      this.store.select(selectRecipeById(this.id)).subscribe((recipe) => {
        this.recipe = recipe;
      })
    });
  }

  onAddToShoppingList() {
    if (this.recipe) {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipe-book']);
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
