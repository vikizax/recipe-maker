import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInputRef: ElementRef<HTMLInputElement>;
  shoppingListForm: FormGroup;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, this.checkAmountCustomValidator, Validators.min(1)])
    });

    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index)
        if (this.editedItem)
          this.shoppingListForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          })
      }
    )
  }
  // onAddItem(event: Event) {
  // event.preventDefault();
  // const ingredientName = this.nameInputRef.nativeElement.value;
  // const ingredientAmount = +this.amountInputRef.nativeElement.value;
  // if (!ingredientName || ingredientAmount === 0) return;
  onAddItem() {
    if (this.shoppingListForm.invalid) return
    const ingredientName = this.shoppingListForm.get('name').value;
    const ingredientAmount = this.shoppingListForm.get('amount').value;
    if (this.editMode) return this.onEdit({ name: ingredientName, amount: ingredientAmount });
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(newIngredient)
    this.shoppingListForm.reset()
  }

  checkAmountCustomValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value === '' || control.value === null || control.value === undefined) return null
    if (!/^\d*\.?\d*$/g.test(control.value))
      return {
        invalidAmount: true
      }
  }

  onEdit(updatedIngredient: Ingredient) {
    this.shoppingListService.editIngretient(this.editedItemIndex, updatedIngredient)
    this.shoppingListForm.reset()
    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  isDeleteEnabled() {
    return !Number.isInteger(this.editedItemIndex)
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

}
