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
  private itemSelectedSubscription!: Subscription;
  ingredients: Ingredient[] = [];
  selectedItem?: Ingredient | null

  constructor(private shopService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shopService.ingredientsEmitter
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
    this.itemSelectedSubscription = this.shopService.ingredientSelected.subscribe(value => {
      if (value === -1) {
        this.selectedItem = null;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.itemSelectedSubscription.unsubscribe();
  }

  onItemEdit(item: Ingredient, index: number) {
    this.shopService.ingredientSelected.next(index);
    this.selectedItem = item;
  }
}
