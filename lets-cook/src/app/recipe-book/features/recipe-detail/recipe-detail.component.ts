import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../data-access/models/recipe.model';
import { RecipeService } from '../../data-access/services/recipe.service';
import { Subscription } from 'rxjs';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = Number.parseInt(params['id']);
      this.recipe = this.recipeService.getRecipeById(this.id);
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
