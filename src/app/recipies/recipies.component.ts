import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipie-list/recipe.model';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css',
  providers: [RecipeService]
})
export class RecipiesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  currentSelectedReciepeSubscription: Subscription;
  constructor(private recipeService: RecipeService) { }
  ngOnInit() {
    this.currentSelectedReciepeSubscription = this.recipeService.currentSelectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe
    })
  }
  ngOnDestroy(): void {
    this.currentSelectedReciepeSubscription.unsubscribe()
  }
}
