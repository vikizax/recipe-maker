import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from './recipie-list/recipe.model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css'
})
export class RecipiesComponent {
  selectedRecipe: Recipe;
  onSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe
  }
}
