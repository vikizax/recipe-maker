import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipieDetailsComponent } from './recipies/recipie-details/recipie-details.component';
import { RecipieItemComponent } from './recipies/recipie-list/recipie-item/recipie-item.component';
import { RecipieListComponent } from './recipies/recipie-list/recipie-list.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { HighlightDirective } from './shared/highlight.directive';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { IngredientService } from './shared/ingredient.service';
import { RecipeService } from './shared/recipe.service';
import { LoggingService } from './shared/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailsComponent,
    RecipieItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideAnimationsAsync(),
    IngredientService,
    RecipeService,
    LoggingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
