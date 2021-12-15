import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  currentRecipe: Recipe = {
    name: '',
    description: '',
    imagePath: ''
  };

  constructor() { }

  ngOnInit(): void {

  }

  onNewRecipe(recipe: Recipe) {
    this.currentRecipe = recipe;
  }

}
