import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const route: Routes = [
    {
        path: '',
        component: RecipiesComponent
    },
    {
        path: 'recipies',
        component: RecipiesComponent
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    }
]


@NgModule({
    imports: [
        RouterModule.forRoot(route)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }