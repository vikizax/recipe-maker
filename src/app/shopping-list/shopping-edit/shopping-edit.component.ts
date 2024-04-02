import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { IngredientService } from '../../shared/ingredient.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInputRef: ElementRef<HTMLInputElement>;
  // @Output() addedIngredient = new EventEmitter<{ name: string; amount: number }>()

  constructor(private ingredientService: IngredientService) { }

  onAddItem(event: Event) {
    event.preventDefault();
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = +this.amountInputRef.nativeElement.value;

    if (!ingredientName || ingredientAmount === 0) return;


    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.ingredientService.addIngredient(newIngredient)
    // this.addedIngredient.emit(newIngredient);
  }
}
