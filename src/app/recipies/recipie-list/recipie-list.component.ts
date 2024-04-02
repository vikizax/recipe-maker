import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css',
})
export class RecipieListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>()

  recipies: Recipe[];

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.recipies = this.recipeService.recipies;
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe)
  }

}
