import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../data-storage.service";
import { RecipeService } from "../recipies/recipe.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    // @Output() featureSelected = new EventEmitter<string>()

    // onSelect(feature: string, event: Event) {
    //     event.preventDefault()
    //     this.featureSelected.emit(feature)
    // }
    constructor(private dataStorageService: DataStorageService) { }
    onSaveData() {
        this.dataStorageService.storeRecipes()
    }
    onFetchData() {
        this.dataStorageService.getRecipes()
    }
}