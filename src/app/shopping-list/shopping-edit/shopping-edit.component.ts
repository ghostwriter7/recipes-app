import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;

  private index: number | null = null;
  private subscription!: Subscription;
  public isEditingIngredient: boolean = false;

  constructor(private shopService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shopService.ingredientSelected.subscribe(number => {
      if (number >= 0) {
        const { name, quantity } = this.shopService.getIngredient(number);
        this.form.setValue({name, quantity});
        this.index = number;
        this.isEditingIngredient = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    if (this.isEditingIngredient && typeof this.index === 'number') {
      this.shopService.editIngredient({
        name: this.form.value['name'],
        quantity: this.form.value['quantity']
      }, this.index)
    } else {
      this.shopService.addIngredients([{
        name: this.form.value['name'],
        quantity: this.form.value['quantity']
      }]);
    }

  this.init();
  }

  onItemDelete() {
    if (typeof this.index === 'number' && this.index !== -1) {
      this.shopService.deleteIngredient(this.index);
    }
    this.init();
  }

  onFormClear() {
    this.init();
    this.shopService.ingredientSelected.next(-1);
  }

  init() {
    this.form.reset();
    this.isEditingIngredient = false;
    this.index = null;
  }
}
