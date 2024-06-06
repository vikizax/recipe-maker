import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipies: Recipe[];
  // isLoading: boolean = true;
  recipeSubscription: Subscription;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private dataService: DataStorageService,) { }

  addNewRecipie() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.recipies = this.recipeService.getRecipies();
    this.recipeSubscription = this.recipeService.recipiesSubject.subscribe((recipies) => {
      this.recipies = recipies
    })
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe()
  }

}
