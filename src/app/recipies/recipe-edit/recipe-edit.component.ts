import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  id: number;
  editMode: boolean = false;
  name:string;
  description:string;
  imagePath: string;
  
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id !== undefined

      if (this.editMode) {
        const { description, imgPath, ingredients, name } = this.recipeService.getRecipieById(this.id)
        this.name = name;
        this.description= description
        this.imagePath = imgPath;
      }
      if (!this.editMode) console.log('IN NEW_RECIPE MODE')

    })
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    
  }

}
