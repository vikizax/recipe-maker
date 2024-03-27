import { Component, Input } from '@angular/core';
import { Recipe } from '../recipie-list/recipe.model';

@Component({
  selector: 'app-recipie-details',
  templateUrl: './recipie-details.component.html',
  styleUrl: './recipie-details.component.css'
})
export class RecipieDetailsComponent {
  @Input() recipe: Recipe;
  
}
