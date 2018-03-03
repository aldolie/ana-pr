import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]
  private recipeChangedSubscription: Subscription;

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {
    this.recipes = recipeService.getRecipes();
   }

  ngOnInit() {
    this.recipeChangedSubscription = this.recipeService.recipeChanged.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy() {
    this.recipeChangedSubscription.unsubscribe()
  }

}
