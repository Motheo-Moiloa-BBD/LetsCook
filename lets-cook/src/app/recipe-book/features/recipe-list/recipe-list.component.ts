/* eslint-disable @ngrx/no-store-subscription */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../data-access/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRecipes } from '../../data-access/store/selector/recipe-book.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeListSubscription?: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.recipeListSubscription = this.store.select(selectRecipes).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    if(this.recipeListSubscription){
      this.recipeListSubscription.unsubscribe();
    }
    
  }
}
