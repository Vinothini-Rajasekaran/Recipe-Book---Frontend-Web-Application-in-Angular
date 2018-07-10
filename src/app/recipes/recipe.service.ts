import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Bombay Potatoes', 'Yummy!!! Sidedish',
      'https://www.talesfromthekitchenshed.com/sj-desford/uploads/2016/06/Bombay_main600_400.jpg',
      [new Ingredient('Potatoes', 12),
        new Ingredient('cilatron', 1),
      ]),
    new Recipe('Veg Briyani', 'Tasty and Delicious',
      'http://bongong.com/images/recipes/Vegetable_Pulao//IMG_0242_2005294783.hero.JPG',
      [new Ingredient('Basmati Rice', 1),
        new Ingredient('Vegetables',5)
      ]
    )];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = this.recipes;
    this.recipesChanged.next(this.recipes.slice());
    console.log(recipes);
  }


  getRecipes() {
    return this.recipes.slice();
   
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
