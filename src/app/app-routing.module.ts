import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth-guard.service';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CanDeactivateGuard } from './recipes/recipe-detail/can-deactivate-guard.service';
import { RecipeResolver } from './recipes/recipe-detail/recipe-resolver.service';

const routes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: 'recipe/:id',
    // canActivate: [AuthGuard],
    component: RecipeDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    resolve: {recipe: RecipeResolver}},
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
