import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe
  index: number;

  constructor(private router: Router, private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.recipe = this.recipeService.getRecipe(+id);
    }
    this.route.params.subscribe((params) => {
      const index = params['id'];
      if (index) {
        this.index = index;
        this.recipe = this.recipeService.getRecipe(index);
      }
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe);
  }

  onDeleteRecipe() {
    if (this.index) {
      this.recipeService.deleteRecipe(this.index);
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

}
