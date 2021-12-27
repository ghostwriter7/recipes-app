import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredients.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEditMode: boolean = false;
  public form!: FormGroup;
  public imgPath: string = 'https://images.unsplash.com/photo-1583162558971-6c686a2dc9f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80';
  name!: string;
  data!: {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[]
  };

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isEditMode = params.hasOwnProperty('id');
      this.name = params.hasOwnProperty('id') && params['id'] || '';

      if (this.isEditMode) {
        const recipe = this.recipeService.getRecipe(this.name);
        this.data = {
          name: recipe.name,
          description: recipe.description,
          imagePath: recipe.imagePath,
          ingredients: [...recipe.ingredients]
        };
        this.imgPath = recipe.imagePath;
      }
    });

    const ingredients: FormGroup[] = [];

    if (this.data?.ingredients) {
      this.data.ingredients.forEach(ingredient => {
        const group = new FormGroup({
          'name': new FormControl(ingredient.name),
          'quantity': new FormControl(ingredient.quantity)
        });

        ingredients.push(group);
      });
    }

    this.form = new FormGroup({
      'name': new FormControl(this.data?.name || null, Validators.required),
      'imagePath': new FormControl(this.data?.imagePath || null, Validators.required),
      'description': new FormControl(this.data?.description || null, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    const newRecipe = {
      name: this.form.value['name'],
      description: this.form.value['description'],
      imagePath: this.form.value['imagePath'],
      ingredients: [...this.form.value['ingredients']]
    };
    this.imgPath = this.form.value.imagePath;

    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.name, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onFormClear();
  }

  onFormClear() {
    (<FormArray>this.form.controls['ingredients']).clear();
    this.form.reset();
  }

  onAddIngredient() {
    const ingredientControl = new FormGroup({
        'name': new FormControl('', Validators.required),
        'quantity': new FormControl(0, Validators.required)
    });

    (<FormArray>this.form.get('ingredients')).push(ingredientControl);
  }

  onIngredientRemove(idx: number) {
    (<FormArray>this.form.controls['ingredients']).removeAt(idx);
  }

  get controls() {
    return this.form.get('ingredients') as FormArray;
  }
}
