import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { LoggingService } from "../shared/logging.service";

@Injectable()
export class ShoppingListService {
    ingredientsUpdate = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Carrot', 10),
    ]

    constructor(private loggingService: LoggingService) { }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.loggingService.log('ADD INGREDIENT: ' + JSON.stringify(ingredient))
        this.ingredients.push(ingredient);
        this.ingredientsUpdate.emit(this.getIngredients())
    }
}