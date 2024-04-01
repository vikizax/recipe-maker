import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { LoggingDependency } from '../../shared/logging.dependecy';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
  providers: [LoggingDependency]
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInputRef: ElementRef<HTMLInputElement>;
  @Output() addedIngredient = new EventEmitter<{ name: string; amount: number }>()

  constructor(private loggingService: LoggingDependency) { }

  onAddItem(event: Event) {
    event.preventDefault()
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount = +this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount)
    this.loggingService.log('NEW ITEM ADDED')
    this.addedIngredient.emit(newIngredient);
  }
}
