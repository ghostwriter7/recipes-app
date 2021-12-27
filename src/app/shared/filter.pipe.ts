import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(recipes: Recipe[], filterTerm: string, filterTag: string) {
    if (!recipes.length || !filterTerm) {
      return recipes;
    }

    const result: Recipe[] = [];

    recipes.forEach((recipe: Recipe) => {
      if (filterTag === 'ingredients') {
        for (let i = 0; i < recipe['ingredients'].length; i++) {
          if (recipe['ingredients'][i].name.indexOf(filterTerm) !== -1) {
            result.push(recipe);
            break;
          }
        }
      } else { // @ts-ignore
        if (recipe[filterTag as keyof Recipe].indexOf(filterTerm) !== -1) {
          result.push(recipe);
        }
      }
      });

    return result;
  }
}
