import { Component, OnInit, Input } from '@angular/core';

import { Ingredient } from '../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Input() set item(item: Ingredient) {
    this._item = item;
  }
  
  _item: Ingredient = {
    name: '',
    quantity: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

}
