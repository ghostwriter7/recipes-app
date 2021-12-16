import { Ingredient } from '../shared/ingredients.model';

export interface Recipe {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
}
