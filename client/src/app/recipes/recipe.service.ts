import { Recipe } from "../models/recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs/Subject";
import { Http } from '@angular/http';

@Injectable()
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
  	    new Recipe('BTC', 19000),
  	    new Recipe('XRP', 2800),
  	    new Recipe('STR', 3000)
    ];

    constructor(private http: Http) {

    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.getRecipes());
    }

    getRecipes() : Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(recipe: Recipe) {
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.getRecipes());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.getRecipes());
    }

}
