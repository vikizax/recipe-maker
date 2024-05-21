import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id !== undefined
      this.initForm()
    })
  }

  onSubmit(form: NgForm) {
    // console.log(form.value)
    console.log(this.recipeForm.value)
  }

  initForm() {
    const ingredientsFormArray = new FormArray([])
    const { description, imgPath, ingredients, name } = this.recipeService.getRecipieById(this.id)

    if (ingredients) {
      for (let ingredient of ingredients) {
        ingredientsFormArray.push(new FormGroup({
          'name': new FormControl(ingredient.name),
          'amount': new FormControl(ingredient.amount)
        }))
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(),
      'imgPath': new FormControl(),
      'description': new FormControl(),
      'ingredients': ingredientsFormArray
    })

    this.recipeForm.patchValue({
      name,
      description,
      imgPath
    })
  }

  getIngredientsControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

}
