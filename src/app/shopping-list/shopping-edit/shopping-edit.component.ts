import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  item: Ingredient = { name: '', quantity: 0 };
  private subscription!: Subscription;

  @ViewChild('name') name!: ElementRef;
  @ViewChild('quantity') quantity!: ElementRef;

  constructor(private shopService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shopService.itemClick.subscribe(item => {
      this.item = item;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    if ( this.name.nativeElement.value && this.quantity.nativeElement.value ) {
      this.shopService.addToIngredients({
        name: this.name.nativeElement.value,
        quantity: +this.quantity.nativeElement.value
      })
    }
  }
}
