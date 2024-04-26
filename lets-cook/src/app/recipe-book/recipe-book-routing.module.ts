import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './features/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './features/recipe-edit/recipe-edit.component';
import { recipeResolver } from './utils/functions/recipe.resolver';

const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
  },
  {
    path: 'new',
    component: RecipeEditComponent,
  },
  {
    path: ':id',
    component: RecipeDetailComponent,
    resolve: [recipeResolver],
  },

  {
    path: ':id/edit',
    component: RecipeEditComponent,
    resolve: [recipeResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeBookRoutingModule {}
