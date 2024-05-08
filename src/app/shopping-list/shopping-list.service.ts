import { Subject } from 'rxjs'
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { LoggingService } from "../shared/logging.service";

@Injectable()
export class ShoppingListService {
    ingredientsUpdate = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = []

    constructor(private loggingService: LoggingService) { }

    getIngredients() {
        return this.ingredients.slice();
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
}