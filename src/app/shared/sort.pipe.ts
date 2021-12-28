import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from './ingredients.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(ingredients: Ingredient[], order: boolean) {
    return ingredients.sort((a, b) => order ?
      a.name.charCodeAt(0) - b.name.charCodeAt(0) : b.name.charCodeAt(0) - a.name.charCodeAt(0));
  }
}
