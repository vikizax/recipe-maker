import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipie-list/recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

type MangeRecipeType = 'to-shopping-list' | 'edit-recipe' | 'delete-recipe'

@Component({
  selector: 'app-recipie-details',
  templateUrl: './recipie-details.component.html',
  styleUrl: './recipie-details.component.css'
})
export class RecipieDetailsComponent implements  OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = +params.id
        this.recipe = this.recipeService.getRecipieById(this.id)
    })
  }

  onSelectChange(event: Event & { target: HTMLSelectElement & { value: MangeRecipeType } }) {
    if (event.target.value === 'to-shopping-list') {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    }
    if (event.target.value === 'edit-recipe') { }
    if (event.target.value === 'delete-recipe') { }
  }
}
