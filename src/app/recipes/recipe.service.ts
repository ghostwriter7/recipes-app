import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  public recipes: Recipe[] = [];

  private URL: string = 'https://recipes-f4a4c-default-rtdb.europe-west1.firebasedatabase.app';

  distributeRecipes = new Subject<Recipe[]>();

  constructor(private shopService: ShoppingListService,
              private http: HttpClient) {}

  public saveRecipes() {
    this.http.put(`${this.URL}/recipes.json`, this.recipes).subscribe(data => console.log(data));
  }

  public fetchRecipes() {
    this.http.get<Recipe[]>(`${this.URL}/recipes.json`, {
      params: new HttpParams().set('print', 'pretty')
    }).subscribe((recipes: Recipe[]) => {
      this.distributeRecipes.next(recipes);
      this.recipes = recipes;
    })
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
