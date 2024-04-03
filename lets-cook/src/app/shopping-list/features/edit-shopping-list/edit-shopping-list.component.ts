import { Component } from '@angular/core';
import { ShoppingListService } from '../../data-access/services/shopping-list.service';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css'],
})
export class EditShoppingListComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  addIngredient(name: string, amount: string) {
    this.shoppingListService.addIngredient({
      name: name,
      amount: Number.parseInt(amount),
    });
  }
}
