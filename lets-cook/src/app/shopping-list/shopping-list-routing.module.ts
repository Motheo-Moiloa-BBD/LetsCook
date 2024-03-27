import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './features/shopping-list/shopping-list.component';
import { EditShoppingListComponent } from './features/edit-shopping-list/edit-shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
  },
  {
    path: 'edit/id',
    component: EditShoppingListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
