import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { RecipesComponent } from './recipes.component';
import { RecipeEntryComponent } from './recipe-entry/recipe-entry.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

const routes: Routes = [
{ path: '',
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
  },
  { path: ':id/edit', component: RecipeEditComponent,
    resolve: [RecipeResolverService]
  }
] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
