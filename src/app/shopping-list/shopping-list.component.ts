import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientService } from '../shared/ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]
  ngOnInit(): void {
    this.ingredients = this.ingredientService.ingredients;
  }
  constructor(private ingredientService: IngredientService) { }
  // onAddNewIngredient(ingredient: Ingredient) {
  //   this.ingredientService.addIngredient(ingredient)
  // }
}
