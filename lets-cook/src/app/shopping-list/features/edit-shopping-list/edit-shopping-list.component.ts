import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../../data-access/services/shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css'],
})
export class EditShoppingListComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  subscription?: Subscription;
  editMode: boolean = false;
  editedIngredientIndex?: number;
  editIngredient?: Ingredient;

  shoppingListForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern('^[1-9]+[0-9]*$'),
    ]),
  });

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedIngredientIndex = index;
        this.editMode = true;
        this.editIngredient = this.shoppingListService.getIngredient(index);

        this.shoppingListForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount,
        });
      }
    );
  }

  get formControls() {
    return this.shoppingListForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.shoppingListForm.valid) {
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedIngredientIndex!, {
          name: this.shoppingListForm.value.name,
          amount: this.shoppingListForm.value.amount,
        });
      } else {
        this.shoppingListService.addIngredient({
          name: this.shoppingListForm.value.name,
          amount: this.shoppingListForm.value.amount,
        });
      }
      this.onClear();
    }
  }

  onClear() {
    this.submitted = false;
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex!);
    this.onClear();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
