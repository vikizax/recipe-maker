import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrl: './recipies.component.css',
  providers: [RecipeService]
})
export class RecipiesComponent {
}
