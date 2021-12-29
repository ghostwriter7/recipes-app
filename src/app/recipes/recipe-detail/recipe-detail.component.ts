import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, CanComponentDeactivate {
  recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: []
  };
  sort: boolean = false;

  addedToShoppingCart: boolean = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(params['id']);
    });
  }

  onAddToShopList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.addedToShoppingCart = true;
    this.router.navigate(['/shopping-list']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.addedToShoppingCart) {
      return true;
    } else {
      return confirm('Are you sure you want to leave?');
    }
  }

  onRecipeDelete() {
    this.recipeService.deleteRecipe(this.route.snapshot.params['id']);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
