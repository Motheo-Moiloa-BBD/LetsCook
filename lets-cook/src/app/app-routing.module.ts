import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './shared/features/nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipe-book',
    pathMatch: 'full',
  },
  {
    path: 'shopping-list',
    component: NavBarComponent,
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'recipe-book',
    component: NavBarComponent,
    loadChildren: () =>
      import('./recipe-book/recipe-book.module').then(
        (m) => m.RecipeBookModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
