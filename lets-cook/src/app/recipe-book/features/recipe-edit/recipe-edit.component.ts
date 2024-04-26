/* eslint-disable @ngrx/no-store-subscription */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Recipe } from '../../data-access/models/recipe.model';
import { Store } from '@ngrx/store';
import { selectRecipeById, selectRecipes } from '../../data-access/store/selector/recipe-book.selectors';
import { addRecipe, updateRecipe } from '../../data-access/store/action/recipe-book.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private paramSubscription?: Subscription;
  private storeSubscription?: Subscription;
  id?: number;
  editMode = false;
  submitted: boolean = false;
  recipe?: Recipe;

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredients: new FormArray<FormGroup>([]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  get formControls() {
    return this.recipeForm.controls;
  }

  get ingredients() {
    return this.formControls['ingredients'] as FormArray;
  }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = Number.parseInt(params['id']);
      this.editMode = params['id'] != null;
    });

    if (this.editMode && this.id) {
      this.storeSubscription = this.store.select(selectRecipeById(this.id)).subscribe((recipe) => {
        this.recipe = recipe;
      });

      if (this.recipe) {
        while (this.ingredients.length !== 0) {
          this.ingredients.removeAt(0);
        }

        if (this.recipe['ingredients']) {
          for (const ingredient of this.recipe.ingredients) {
            this.ingredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern('^[1-9]+[0-9]*$'),
                ]),
              })
            );
          }
        }

        this.recipeForm.setValue({
          name: this.recipe.name,
          imagePath: this.recipe.imagePath,
          description: this.recipe.description,
          ingredients: this.ingredients,
        });
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    const newRecipe: Recipe = {
      name: this.formControls['name'].value,
      description: this.formControls['description'].value,
      imagePath: this.formControls['imagePath'].value,
      ingredients: this.ingredients.value,
    };

    if (this.editMode) {
      newRecipe.id = this.id;
      this.store.dispatch(updateRecipe({ id: this.id!, updatedRecipe: newRecipe }))
      this.router.navigate(['/recipe-book', this.id]);
    } else {
      this.store.select(selectRecipes).pipe(take(1)).subscribe((recipes) => {
        newRecipe.id = recipes.length + 1;
      })
      this.store.dispatch(addRecipe({ recipe: newRecipe }))
      this.router.navigate(['/recipe-book']);
    }
  }

  onAddIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$'),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onCancel() {
    this.editMode = false;
    this.router.navigate(['/recipe-book']);
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe()
    }
  }
}
