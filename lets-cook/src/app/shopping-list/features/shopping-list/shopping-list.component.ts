import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIngredients } from '../../data-access/store/selector/shopping-list.selectors';
import { startEdit } from '../../data-access/store/action/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$?: Observable<Ingredient[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select(selectIngredients);
  }

  onEditIngredient(index: number) {
    this.store.dispatch(startEdit({ index }));
  }
}
