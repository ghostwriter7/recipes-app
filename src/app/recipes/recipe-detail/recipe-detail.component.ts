import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: []
  };

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.onRecipeSelected.subscribe(recipe => {
      this.recipe = recipe;
    })
  }

  onAddToShopList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
