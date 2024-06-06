import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe-list/recipe.model";
import { DataStorageService } from "../data-storage.service";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipiesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipiesService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Recipe[]> {
        if (this.recipiesService.getRecipies().length > 0) return this.recipiesService.getRecipies()
        return this.dataStorageService.getRecipes()
    }
}