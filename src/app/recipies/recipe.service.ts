import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";
import { LoggingService } from "../shared/logging.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe-list/recipe.model";

@Injectable()
export class RecipeService {
    recipiesSubject = new Subject<Recipe[]>()
    private recipies: Recipe[] = [
        // new Recipe(
        //     'Burger',
        //     'Recipe for making a stacked spicy burger',
        //     'https://img.freepik.com/free-vector/fresh-burger-fast-food-icon-isolated-design_18591-82739.jpg?t=st=1711307371~exp=1711310971~hmac=ddd708e7111f4abe61f7705fa70e9b5b42c2db37b92bc072caaed9021b1a167d&w=900',
        //     [
        //         new Ingredient('Sliced Onion', 1),
        //         new Ingredient('Cheese Slices', 4),
        //         new Ingredient('Tomatoes', 10),
        //         new Ingredient('Carrot', 10),
        //     ]
        // ),
        // new Recipe(
        //     'Speghetti',
        //     'A delicious Speghetti recipe',
        //     'https://img.freepik.com/free-vector/hand-drawn-food-cartoon-illustration_23-2150695329.jpg?t=st=1711379998~exp=1711383598~hmac=de8bd73b18d85a76123c6e6aa74966f6b2fe335cb259c77b96bec5164e222eee&w=826',
        //     [
        //         new Ingredient('Small Onion', 1),
        //         new Ingredient('Garlic Powder', 1),
        //     ]
        // ),
        // new Recipe(
        //     'Pasta',
        //     'A maxican style Pasta recipe',
        //     'https://img.freepik.com/free-vector/illustrated-hand-drawn-salchipapa_23-2148725910.jpg?w=826',
        //     [
        //         new Ingredient('Ginger Garlic Paste', 0.5),
        //         new Ingredient('Slices tomatoes', 0.5),
        //         new Ingredient('Apples', 5),
        //     ]
        // )
    ]

    constructor(private loggingService: LoggingService, private shoppingListService: ShoppingListService) { }

    setRecipe(recipies: Recipe[]) {
        this.recipies = recipies;
        this.recipiesSubject.next(this.recipies.slice())
    }

    getRecipies() {
        return this.recipies.slice();
    }

    getRecipieById(idx: number) {
        return this.recipies.slice()[idx]
    }

    addRecipe(recipe: Recipe) {
        this.loggingService.log('ADD RECIPE: ' + JSON.stringify(recipe));
        this.recipies.push(recipe)
        this.recipiesSubject.next(this.getRecipies())
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.loggingService.log('ADDING INGREDIENTS TO SHOPPING LIST SERVICE: ' + JSON.stringify(ingredients));
        this.shoppingListService.addIngredients(ingredients)
    }

    updateRecipeById(idx: number, updatedRecipe: Recipe) {
        this.loggingService.log('UPDATING RECIPE: ' + JSON.stringify(updatedRecipe));
        this.recipies[idx] = updatedRecipe;
        this.recipiesSubject.next(this.getRecipies())
    }

    deleteRecipeById(idx: number) {
        this.recipies.splice(idx, 1);
        this.recipiesSubject.next(this.getRecipies())
    }
}