import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredients.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  private recipes: Recipe[] = [
    { name: 'veggies',
      description: 'delicious as hell, trust me',
      imagePath: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ingredients: [{ name: 'cucumber', quantity: 5 }, { name: 'carrot', quantity: 3 }, { name: 'potatoes', quantity: 30}]
    },
    { name: 'reindeer meat',
      description: 'it is very nutritious, and cheaper than chicken',
      imagePath: 'https://images.unsplash.com/photo-1610389444027-27466f27b0a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ingredients: [{ name: 'reindeer', quantity: 1 }, { name: 'rice', quantity: 10 }, { name: 'potatoes', quantity: 30}]
    },
    { name: 'pizza',
      description: 'simple as it, damn pizza, tastes good',
      imagePath: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ingredients: [{ name: 'flour', quantity: 5 }, { name: 'tomatoes', quantity: 3 }, { name: 'ham', quantity: 30}]
    }
  ];

  distributeRecipes = new BehaviorSubject<Recipe[]>(this.recipes);

  constructor(private shopService: ShoppingListService) {}

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
  }
}
