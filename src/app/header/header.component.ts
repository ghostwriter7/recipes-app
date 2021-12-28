import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
  date: Date = new Date();

  constructor(private recipeService: RecipeService) {}

  onFetchData() {
    this.recipeService.fetchRecipes();
  }

  onSaveData() {
    this.recipeService.saveRecipes();
  }
}
