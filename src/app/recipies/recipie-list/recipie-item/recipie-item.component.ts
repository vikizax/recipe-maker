import { Component, Input } from '@angular/core';
import { RecipeService } from '../../../shared/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css'
})
export class RecipieItemComponent {
  @Input() recipe: Recipe;
  // @Output() recipeSelected = new EventEmitter<void>()

  constructor(private recipeService: RecipeService) { }

  onSelected() {
    this.recipeService.setCurrentSelectedRecipe(this.recipe)
  }

}
