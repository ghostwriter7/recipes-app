import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredients.model';
import { map, Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  public recipes: Recipe[] = [];
  private readonly URL = 'https://recipes-f4a4c-default-rtdb.europe-west1.firebasedatabase.app';

  distributeRecipes = new Subject<Recipe[]>();

  constructor(
      private readonly shopService: ShoppingListService,
      private readonly http: HttpClient
  ) {}

  public saveRecipes() {
    this.http.put<Recipe[]>(`${this.URL}/recipes.json`, this.recipes).subscribe();
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.URL}/recipes.json`, {
      params: new HttpParams().set('print', 'pretty')
    })
    .pipe(map((recipes: Recipe[]) => {
      return recipes.map(recipe => {
        if (!recipe.hasOwnProperty('ingredients')) {
          recipe['ingredients'] = [];
        }
        return recipe;
      });
    }),
      tap(recipes => {
        this.distributeRecipes.next(recipes);
        this.recipes = recipes;
      }))
    // .subscribe((recipes: Recipe[]) => {
    //   this.distributeRecipes.next(recipes);
    //   this.recipes = recipes;
    // });
  }

  getRecipe(name: string): Recipe {
    return this.recipes.find(el => el.name === name)!;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }

  updateRecipe(name: string, newRecipe: Recipe) {
    this.recipes[this.recipes.findIndex(recipe => recipe.name === name)] = newRecipe;
    this.distributeRecipes.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.distributeRecipes.next(this.recipes.slice());
  }

  deleteRecipe(name: string) {
    this.recipes.splice((this.recipes.findIndex(recipe => recipe.name === name)), 1);
    this.distributeRecipes.next(this.recipes.slice());
  }
}
