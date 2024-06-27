import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "./recipies/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipies/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipies/recipe-start/recipe-start.component";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipiesResolverService } from "./recipies/recipies-resolvers.service";
import { AuthComponent } from "./auth/auth.component";

const route: Routes = [
    {
        path: '',
        redirectTo: '/recipies',
        pathMatch: 'full',
    },
    {
        path: 'recipies',
        component: RecipiesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent,
                resolve: [RecipiesResolverService],
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailsComponent,
                resolve: [RecipiesResolverService]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipiesResolverService]
            },
        ]
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    }, {
        path: 'auth',
        component: AuthComponent
    }
]


@NgModule({
    imports: [ 
        RouterModule.forRoot(route)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }