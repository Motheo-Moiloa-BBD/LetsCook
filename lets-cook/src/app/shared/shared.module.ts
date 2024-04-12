import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { DropDownDirective } from './utils/directives/drop-down.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { AlertComponent } from './ui/alert/alert.component';
import { PlaceHolderDirective } from './utils/directives/place-holder.directive';

@NgModule({
  declarations: [
    NavBarComponent,
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [
    DropDownDirective,
    PlaceHolderDirective,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
})
export class SharedModule {}
