import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipeService.getRecipe(route.params['id']);
  }
}
