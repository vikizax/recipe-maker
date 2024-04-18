import { Component, Input } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css'
})
export class RecipieItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;
  constructor(private recipeService: RecipeService) { }
  // onSelected(event: Event) {
  //   event.preventDefault()
  //   this.recipeService.currentSelectedRecipe.emit(this.recipe)
  // }
}
