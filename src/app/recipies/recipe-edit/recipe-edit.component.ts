import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.initForm()
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id !== undefined
    })
  }

  onSubmit() {
    console.log(this.recipeForm.value)
  }

  initForm() {
    const ingredientsFormArray = new FormArray([])
    if (this.editMode) {
      const { description, imgPath, ingredients, name } = this.recipeService.getRecipieById(this.id)

      if (ingredients) {
        for (let ingredient of ingredients) {
          ingredientsFormArray.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)])
          }))
        }
      }
      this.recipeForm.patchValue({
        name,
        description,
        imgPath
      })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imgPath': new FormControl(null),
      'description': new FormControl(null, Validators.required),
      'ingredients': ingredientsFormArray
    })
  }

  getIngredientsControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)])
      })
    )
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(
      index
    )
  }

}
