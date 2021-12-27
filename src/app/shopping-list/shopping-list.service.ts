import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    { name: 'apples', quantity: 5},
    { name: 'tomatoes', quantity: 10 }
  ];

  ingredientsEmitter = new BehaviorSubject<Ingredient[]>(this.ingredients);
  ingredientSelected = new Subject<number>();

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    const promises: Promise<void>[] = [];
    ingredients.forEach((newIngredient: Ingredient) => {
      const promise = new Promise<Ingredient>((resolve, reject) => {
        const match = this.ingredients.find(ingredient => ingredient.name === newIngredient.name);
        if (match) {
          match.quantity += newIngredient.quantity;
        } else {
          resolve(newIngredient);
        }
      }).then(newIngredient => {
        this.ingredients.push(<Ingredient>newIngredient);
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => this.ingredientsEmitter.next(this.ingredients.slice()));
  }

  editIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
    this.ingredientsEmitter.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsEmitter.next(this.ingredients.slice());
  }
}
