import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  item: Ingredient = { name: '', quantity: 0 };

  @ViewChild('name') name!: ElementRef;
  @ViewChild('quantity') quantity!: ElementRef;

  constructor(private shopService: ShoppingListService) {}

  ngOnInit(): void {
    this.shopService.itemClick.subscribe(item => {
      this.item = item;
    })
  }

  onAddItem() {
    if ( this.name.nativeElement.value && this.quantity.nativeElement.value ) {
      this.shopService.addToIngredients({
        name: this.name.nativeElement.value,
        quantity: +this.quantity.nativeElement.value
      })

      // this.name.nativeElement.value = '';
      // this.quantity.nativeElement.value = '';
    }
  }
}
