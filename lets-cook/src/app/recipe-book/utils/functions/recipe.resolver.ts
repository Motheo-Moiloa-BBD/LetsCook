/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResolveFn } from '@angular/router';
import { Recipe } from '../../data-access/models/recipe.model';
import { map, mergeMap, Observable, of, take } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRecipes } from '../../data-access/store/selector/recipe-book.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { fetchRecipes, setRecipes } from '../../data-access/store/action/recipe-book.actions';

export const recipeResolver: ResolveFn<Recipe[]> = (_route, _state): Observable<Recipe[]> | Recipe[] => {
  const store = inject(Store);
  const actions$ = inject(Actions);

  return store.select(selectRecipes).pipe(take(1), mergeMap((recipes) => {
    if (recipes.length === 0) {
      store.dispatch(fetchRecipes());
      return actions$.pipe(ofType(setRecipes), take(1), map((action) => {
        return action.recipes;
      }));
    } else {
      return of(recipes);
    }
  }))
};
