import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipies/recipe.service";
import { Recipe } from "./recipies/recipe-list/recipe.model";
import { map, Subject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private REALTIME_DB_LINK: string = 'https://ng-be-c15f9-default-rtdb.firebaseio.com/recipies.json'
    isLoading = new Subject<boolean>()
    error = new Subject<string>();
    constructor(private http: HttpClient, private recipiesService: RecipeService) {
        this.isLoading.next(false)
        this.error.next('')
    }

    private errorHandler(err: Error) {
        this.error.next(err.message);
        this.isLoading.next(false);
    }

    storeRecipes() {
        this.isLoading.next(true)
        this.error.next('')
        const recipies = this.recipiesService.getRecipies();
        this.http.put(this.REALTIME_DB_LINK, recipies).subscribe(response => {
            this.isLoading.next(false)
        }, this.errorHandler)
        window.alert('Data Saved!')
    }

    getRecipes() {
        this.isLoading.next(true)
        this.error.next('')
        return this.http.get<Recipe[]>(this.REALTIME_DB_LINK)
            .pipe(
                map(value => {
                    return value.map(recipe => ({ ...recipe, ingredients: recipe.ingredients ?? [] }))
                }),
                tap(value => {
                    this.recipiesService.setRecipe(value)
                    this.isLoading.next(false)
                })
            )
        // .subscribe({
        //     next: (value) => {
        //     },
        //     error: this.errorHandler,
        // })
        // .subscribe(response => {
        //     this.recipiesService.setRecipe(response)
        //     this.isLoading.next(false)
        // }, this.errorHandler)
    }
}