import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    { name: 'apples', quantity: 5},
    { name: 'tomatoes', quantity: 10 }
  ];

  itemClick = new EventEmitter<Ingredient>();

  selectIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addToIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
