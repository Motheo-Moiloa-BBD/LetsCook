import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { EditShoppingListComponent } from './features/edit-shopping-list/edit-shopping-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoppingListComponent, EditShoppingListComponent],
  imports: [CommonModule, ShoppingListRoutingModule, FormsModule],
  exports: [ShoppingListComponent],
})
export class ShoppingListModule {}
