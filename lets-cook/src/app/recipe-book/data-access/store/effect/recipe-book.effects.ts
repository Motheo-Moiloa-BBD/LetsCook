/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @ngrx/prefer-concat-latest-from */
/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchRecipes, setRecipes, storeRecipes } from '../action/recipe-book.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../models/recipe.model';
import { selectRecipes } from '../selector/recipe-book.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeBookEffects {
    constructor(private actions$: Actions, private http: HttpClient, private store: Store) { }

    storeRecipes$ = createEffect(() => this.actions$.pipe(
        ofType(storeRecipes),
        withLatestFrom(this.store.select(selectRecipes)),
        switchMap(([_actionData, recipes]) => {
            return this.http.put<Recipe[]>(
                `https://letscook-server-81a77-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`,
                recipes
            );
        })
    ), { dispatch: false });

    fetchRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchRecipes),
            switchMap(() => {
                return this.http.get<Recipe[]>(
                    `https://letscook-server-81a77-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`
                );
            }),
            map((recipes: Recipe[]) => {
                return recipes.map((recipe: Recipe) => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : [],
                    };
                });
            }),
            map((recipes) => {
                return setRecipes({ recipes });
            })
        )
    );
}
