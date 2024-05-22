import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';


type MangeRecipeType = 'to-shopping-list' | 'edit-recipe' | 'delete-recipe'

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id
      this.recipe = this.recipeService.getRecipieById(this.id)
    })
  }

  onSelectChange(event: Event & { target: HTMLSelectElement & { value: MangeRecipeType } }) {
    if (event.target.value === 'to-shopping-list') {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    }
    if (event.target.value === 'edit-recipe') {
      this.toEditRecipie()
    }
    if (event.target.value === 'delete-recipe') {
      this.onDelete()
    }
  }

  toEditRecipie() {
    // this.router.navigate(['../',this.id,'edit'])
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDelete() {
    this.recipeService.deleteRecipeById(this.id)
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
