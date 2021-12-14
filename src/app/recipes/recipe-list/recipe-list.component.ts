import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    { name: 'veggies', description: 'delicious as hell, trust me', imagePath: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
    { name: 'reindeer meat', description: 'it is very nutritious, and cheaper than chicken', imagePath: 'https://images.unsplash.com/photo-1610389444027-27466f27b0a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
    { name: 'pizza', description: 'simple as it, damn pizza, tastes good', imagePath: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onDetailsClick(recipe: Recipe) {
    this.recipe.emit(recipe);
  }
}
