import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrl: './recipie-list.component.css',
})
export class RecipieListComponent implements OnInit {

  recipies: Recipe[] = [
    new Recipe('Burger', 'Recipe for making a stacked spicy burger', 'https://img.freepik.com/free-vector/fresh-burger-fast-food-icon-isolated-design_18591-82739.jpg?t=st=1711307371~exp=1711310971~hmac=ddd708e7111f4abe61f7705fa70e9b5b42c2db37b92bc072caaed9021b1a167d&w=900')
  ]

  ngOnInit(): void {

  }
}
