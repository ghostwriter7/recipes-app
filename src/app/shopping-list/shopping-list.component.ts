import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  ingredients: Ingredient[] = [];
  selectedItem?: Ingredient;

  constructor(private shopService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shopService.getIngredients();
    this.subscription = this.shopService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onItemClick(item: Ingredient) {
    this.shopService.itemClick.next(item);
    this.selectedItem = item;
  }
}
