import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipies/recipe-start/recipe-start.component";
import { RecipieDetailsComponent } from "./recipies/recipie-details/recipie-details.component";

const route: Routes = [
    {
        path: '',
        redirectTo: '/recipies',
        pathMatch: 'full'
    },
    {
        path: 'recipies',
        component: RecipiesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent,
            },
            {
                path: ':id',
                component: RecipieDetailsComponent
            }
        ]
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