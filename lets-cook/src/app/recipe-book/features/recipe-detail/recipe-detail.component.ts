/* eslint-disable @ngrx/no-store-subscription */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../data-access/models/recipe.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRecipeById } from '../../data-access/store/selector/recipe-book.selectors';
import { deleteRecipe } from '../../data-access/store/action/recipe-book.actions';
import { addMultiple } from 'src/app/shopping-list/data-access/store/action/shopping-list.actions';

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
    private router: Router,
    private store: Store
  ) { }

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
      this.store.dispatch(addMultiple({ ingredients: this.recipe.ingredients }));
      this.router.navigateByUrl('/shopping-list');
    }
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.store.dispatch(deleteRecipe({ id: this.id }))
    this.router.navigate(['/recipe-book']);
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
