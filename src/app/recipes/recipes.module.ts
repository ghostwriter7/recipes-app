import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEntryComponent } from './recipe-entry/recipe-entry.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { FilterPipe } from '../shared/filter.pipe';
import { SortPipe } from '../shared/sort.pipe';
import { DropdownDirective } from '../shared/dropdown.directive';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeEntryComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    FilterPipe,
    SortPipe,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
  exports: [
    DropdownDirective
  ]
})
export class RecipesModule {}
