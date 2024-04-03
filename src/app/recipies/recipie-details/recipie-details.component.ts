import { Component, Input } from '@angular/core';
import { Recipe } from '../recipie-list/recipe.model';
import { RecipeService } from '../recipe.service';

type MangeRecipeType = 'to-shopping-list' | 'edit-recipe' | 'delete-recipe'

@Component({
  selector: 'app-recipie-details',
  templateUrl: './recipie-details.component.html',
  styleUrl: './recipie-details.component.css'
})
export class RecipieDetailsComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  onSelectChange(event: Event & { target: HTMLSelectElement & { value: MangeRecipeType } }) {
    if (event.target.value === 'to-shopping-list') {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    }
    if (event.target.value === 'edit-recipe') { }
    if (event.target.value === 'delete-recipe') { }
  }
}
