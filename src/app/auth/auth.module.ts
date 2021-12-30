import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AuthComponent
  ],
imports: [
  CommonModule,
  RouterModule.forChild([
    { path: '', component: AuthComponent }
  ]),
  FormsModule
]
})
export class AuthModule {}
