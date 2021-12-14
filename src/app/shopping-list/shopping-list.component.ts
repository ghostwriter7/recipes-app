import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    { name: 'apples', quantity: 5},
    { name: 'tomatoes', quantity: 10 }
  ];

  selectedIngredient: Ingredient = {
    name: '',
    quantity: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item: Ingredient) {
    this.selectedIngredient = item;
  }
}
