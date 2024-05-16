import { Subject } from 'rxjs'
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { LoggingService } from "../shared/logging.service";

@Injectable()
export class ShoppingListService {
    ingredientsUpdate = new Subject<Ingredient[]>();
    startedEditing = new Subject<number | null>();
    private ingredients: Ingredient[] = []

    constructor(private loggingService: LoggingService) { }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient) {
        this.loggingService.log('ADD INGREDIENT: ' + JSON.stringify(ingredient))
        this.ingredients.push(ingredient);
        this.ingredientsUpdate.next(this.getIngredients())
    }

    addIngredients(ingredients: Ingredient[]) {
        this.loggingService.log('ADDING INGREDIENTS FROM RECIPE ' + JSON.stringify(ingredients))
        this.ingredients = this.ingredients.concat(ingredients)
        this.ingredientsUpdate.next(this.getIngredients())
    }

    editIngretient(index: number, updatedIngredient: Ingredient) {
        this.loggingService.log('EDITED INGREDIENT' + JSON.stringify(updatedIngredient))
        this.ingredients[index] = updatedIngredient;
        this.ingredientsUpdate.next(this.getIngredients())
        this.startedEditing.next(null)
    }

    deleteIngredient(index: number) {
        this.loggingService.log('DELETED INGREDIENT INDEX ' + index)
        this.ingredients.splice(index, 1)
        this.ingredientsUpdate.next(this.getIngredients())
        this.startedEditing.next(null)
    }
}