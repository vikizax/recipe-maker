import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrl: './recipie-item.component.css'
})
export class RecipieItemComponent {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>()

  onSelected() {
    this.recipeSelected.emit()
  }

}
