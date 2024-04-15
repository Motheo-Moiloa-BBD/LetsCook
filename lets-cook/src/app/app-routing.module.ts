import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './shared/features/nav-bar/nav-bar.component';
import { authGuard } from './auth/utils/guards/auth.guard';

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
    canActivate: [authGuard],
    loadChildren: () =>
      import('./recipe-book/recipe-book.module').then(
        (m) => m.RecipeBookModule
      ),
  },
  {
    path: 'auth',
    component: NavBarComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
