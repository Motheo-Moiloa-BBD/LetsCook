import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { DropDownDirective } from './utils/directives/drop-down.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NavBarComponent, DropDownDirective],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [DropDownDirective],
})
export class SharedModule {}
