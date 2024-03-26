import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './features/home/home.component';
import { RecipeBookModule } from '../recipe-book/recipe-book.module';
import { ShoppingListModule } from '../shopping-list/shopping-list.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RecipeBookModule,
    ShoppingListModule,
  ],
})
export class HomeModule {}
