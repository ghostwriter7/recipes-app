import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredients.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEditMode: boolean = false;
  public form!: FormGroup;
  public imgPlaceholder: string = 'https://images.unsplash.com/photo-1583162558971-6c686a2dc9f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80';
  public imgPath: string = this.imgPlaceholder;
  name!: string;
  data!: {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[]
  };

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

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
      'imagePath': new FormControl(this.data?.imagePath || null, Validators.required, this.checkImage.bind(this)),
      'description': new FormControl(this.data?.description || null, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.name, this.form.value);
    } else {
      this.recipeService.addRecipe(this.form.value);
    }

    this.onFormClear();
    this.router.navigate(['/recipes', this.form.value['name']]);
  }

  onFormClear() {
    (<FormArray>this.form.controls['ingredients']).clear();
    this.form.reset();
    this.imgPath = this.imgPlaceholder;
  }

  onAddIngredient() {
    const ingredientControl = new FormGroup({
        'name': new FormControl(undefined, Validators.required),
        'quantity': new FormControl(undefined, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    (<FormArray>this.form.get('ingredients')).push(ingredientControl);
  }

  onIngredientRemove(idx: number) {
    (<FormArray>this.form.controls['ingredients']).removeAt(idx);
  }

  get controls() {
    return this.form.get('ingredients') as FormArray;
  }

  checkImage(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      fetch(control.value).then(res => {
        if (res.ok) {
          this.imgPath = control.value;
          resolve(null);
        } else {
          this.imgPath = 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80';
          resolve({'invalidImagePath': true});
        }
      }).catch(() => {
        this.imgPath = 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80';
        resolve({'invalidImagePath': true});
      })
    });
  }
}
