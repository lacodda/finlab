import { Injectable } from '@nestjs/common';
import { type NewRecipeInput } from './dto/new-recipe.input';
import { type RecipesArgs } from './dto/recipes.args';
import { type Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as any;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return [
      {
        id: '123',
        title: 'name123',
        description: 'description123',
        creationDate: new Date(),
        ingredients: ['name1', 'name2', 'name3']
      }
    ] as Recipe[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
