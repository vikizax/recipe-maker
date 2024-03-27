import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css',
})
export class RecipieListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>()

  recipies: Recipe[] = [
    new Recipe('Burger', 'Recipe for making a stacked spicy burger', 'https://img.freepik.com/free-vector/fresh-burger-fast-food-icon-isolated-design_18591-82739.jpg?t=st=1711307371~exp=1711310971~hmac=ddd708e7111f4abe61f7705fa70e9b5b42c2db37b92bc072caaed9021b1a167d&w=900'),
    new Recipe('Speghetti', 'A delicious Speghetti recipe', 'https://img.freepik.com/free-vector/hand-drawn-food-cartoon-illustration_23-2150695329.jpg?t=st=1711379998~exp=1711383598~hmac=de8bd73b18d85a76123c6e6aa74966f6b2fe335cb259c77b96bec5164e222eee&w=826'),
    new Recipe('Pasta', 'A maxican style Pasta recipe', 'https://img.freepik.com/free-vector/illustrated-hand-drawn-salchipapa_23-2148725910.jpg?w=826')
  ]

  ngOnInit(): void {

  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe)
  }

}
