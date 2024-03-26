import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeBookRoutingModule } from './recipe-book-routing.module';
import { RecipeListComponent } from './features/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './ui/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
  ],
  imports: [CommonModule, RecipeBookRoutingModule],
  exports: [RecipeListComponent],
})
export class RecipeBookModule {}
