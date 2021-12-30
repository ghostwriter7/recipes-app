import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { AppListHighlight } from './listHighlight.directive';
import { PlaceholderDirective } from './placeholder.directive';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [
    DropdownDirective,
    AppListHighlight,
    PlaceholderDirective,
    AlertComponent
  ],
  imports: [],
  exports: [
    DropdownDirective,
    AppListHighlight,
    PlaceholderDirective,
    AlertComponent
  ]
})
export class SharedModule {}
