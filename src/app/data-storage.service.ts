import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipies/recipe.service";
import { Recipe } from "./recipies/recipe-list/recipe.model";
import { exhaustMap, map, Subject, take, tap } from "rxjs";
import { AuthService } from "./auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private REALTIME_DB_LINK: string = 'https://ng-be-c15f9-default-rtdb.firebaseio.com/recipies.json?auth='
    isLoading = new Subject<boolean>()
    error = new Subject<string>();
    constructor(private http: HttpClient, private recipiesService: RecipeService, private authService: AuthService) {
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
        let token: string = '';
        this.authService.user.pipe(take(1)).subscribe(user => {
            if (user?.token) token = user.token
        })
        this.http.put(this.REALTIME_DB_LINK + token, recipies).
            subscribe({
                next() {
                    this.isLoading.next(false)
                    window.alert('Data Saved!')
                },
                error: this.errorHandler,
            })
    }

    getRecipes() {
        this.isLoading.next(true)
        this.error.next('')
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>(this.REALTIME_DB_LINK + user?.token)
                .pipe(
                    map(value => {
                        return value.map(recipe => ({ ...recipe, ingredients: recipe.ingredients ?? [] }))
                    }),
                    tap(value => {
                        this.recipiesService.setRecipe(value)
                        this.isLoading.next(false)
                    })
                )
        }))
    }

}