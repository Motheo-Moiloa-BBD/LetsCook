import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../../data-access/services/shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';
import { select, Store } from '@ngrx/store';
import {
  add,
  remove,
  stopEdit,
  update,
} from '../../data-access/store/action/shopping-list.actions';
import {
  selectIngredientByIndex,
  selectShoppingListState,
} from '../../data-access/store/selector/shopping-list.selectors';
import { AppState } from 'src/app/shared/data-access/models/app-state.model';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css'],
})
export class EditShoppingListComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  editSubscription?: Subscription;
  editMode: boolean = false;
  editedItem?: Ingredient;

  shoppingListForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern('^[1-9]+[0-9]*$'),
    ]),
  });

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.editSubscription = this.store
      .pipe(select(selectShoppingListState))
      .subscribe((shoppingListState) => {
        if (
          shoppingListState.editedIngredientIndex > -1 &&
          shoppingListState.editedIngredient
        ) {
          this.editMode = true;
          this.editedItem = shoppingListState.editedIngredient;
          this.shoppingListForm.setValue({
            name: shoppingListState.editedIngredient.name,
            amount: shoppingListState.editedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  get formControls() {
    return this.shoppingListForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.shoppingListForm.valid) {
      if (this.editMode) {
        this.store.dispatch(
          update({
            ingredient: {
              name: this.shoppingListForm.value.name,
              amount: this.shoppingListForm.value.amount,
            },
          })
        );
      } else {
        this.store.dispatch(
          add({
            ingredient: {
              name: this.shoppingListForm.value.name,
              amount: this.shoppingListForm.value.amount,
            },
          })
        );
      }
      this.onClear();
    }
  }

  onClear() {
    this.store.dispatch(stopEdit());
    this.submitted = false;
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.store.dispatch(remove());
    this.onClear();
  }

  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
      this.store.dispatch(stopEdit());
    }
  }
}
