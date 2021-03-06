import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CanDeactivateGuard } from './recipes/recipe-detail/can-deactivate-guard.service';
import { RecipeResolver } from './recipes/recipe-detail/recipe-resolver.service';
import { RecipeEntryComponent } from './recipes/recipe-entry/recipe-entry.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes',
    canActivate: [AuthGuard],
    component: RecipesComponent,
    children: [
      { path: '',
        component: RecipeEntryComponent,
      },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
        // canDeactivate: [CanDeactivateGuard],
      },
      { path: ':id/edit', component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      }
    ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
