import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/data-access/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ];
}
