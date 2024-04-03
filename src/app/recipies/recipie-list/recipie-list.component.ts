import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css',
})
export class RecipieListComponent implements OnInit {
  recipies: Recipe[];
  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.recipies = this.recipeService.getRecipies();
  }
}
