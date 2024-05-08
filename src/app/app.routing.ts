import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "./recipies/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipies/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipies/recipe-start/recipe-start.component";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

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
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailsComponent
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent
            },
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