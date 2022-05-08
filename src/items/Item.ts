export type ItemID = number;

export type ItemRecipe = [ItemID, ItemID];
export type ItemRecipes = ItemRecipe[];

export interface BaseItemData {
  name: string;
  recipes: ItemRecipes;
}

export interface ItemData extends BaseItemData {
  id: number;
}

export default class Item {
  readonly id: ItemID;
  readonly name: string;
  readonly recipes: ItemRecipes;

  constructor(data: ItemData) {
    this.id = data.id;
    this.name = data.name;
    this.recipes = data.recipes;
  }

  addRecipe(recipe: ItemRecipe): Item {
    return new Item({
      ...this.export(),
      recipes: [...this.recipes, recipe.sort()],
    });
  }

  export(): ItemData {
    return {
      id: this.id,
      name: this.name,
      recipes: this.recipes,
    };
  }
}
