import { Injectable } from "@angular/core";
import { Ingredient } from "./ingredient.model";
import { LoggingService } from "./logging.service";

@Injectable()
export class IngredientService {
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Carrot', 10),
    ]

    constructor(private loggingService: LoggingService) { }

    addIngredient(ingredient: Ingredient) {
        this.loggingService.log('ADD INGREDIENT: ' + JSON.stringify(ingredient))
        this.ingredients.push(ingredient);
    }
}