import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipies: Recipe[];
  isLoading: boolean = true;
  recipeSubscription: Subscription;
  isLoadingSubscription: Subscription;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private dataService: DataStorageService) { }

  addNewRecipie() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    // this.recipies = this.recipeService.getRecipies();
    this.dataService.getRecipes()
    this.recipeSubscription = this.recipeService.recipiesSubject.subscribe((recipies) => {
      this.recipies = recipies
    })
    this.isLoadingSubscription = this.dataService.isLoading.subscribe(val => {
      this.isLoading = val
    })
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe()
    this.isLoadingSubscription.unsubscribe()
  }

}
