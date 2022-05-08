import Item, { ItemData, ItemID, ItemRecipe } from "./Item";

type RawItemMap = { [itemID: string]: ItemData };

export interface AddItemData {
  name: string;
  recipe: ItemRecipe | null;
}

export interface ItemMapData {
  map: RawItemMap;
  nextID: number;
}

export default class ItemMap {
  private readonly map: ReadonlyMap<ItemID, Item>;
  private readonly nextID: number;

  constructor(data?: ItemMapData) {
    if (data == null) {
      this.map = new Map();
      this.nextID = 0;
    } else {
      this.map = new Map(
        Object.entries(data.map).map(([key, itemData]) => [
          parseInt(key, 10),
          new Item(itemData),
        ]),
      );
      this.nextID = data.nextID;
    }
  }

  addItem({ name, recipe }: AddItemData): ItemMap {
    const data = this.export();
    const preExistingItem = Array.from(this.map.values()).find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (preExistingItem) {
      if (recipe == null) {
        return this;
      }

      const newItems: RawItemMap = {
        ...data.map,
        [preExistingItem.id]: preExistingItem.addRecipe(recipe).export(),
      };

      return new ItemMap({
        map: newItems,
        nextID: data.nextID,
      });
    } else {
      const newItems: RawItemMap = {
        ...data.map,
        [data.nextID]: {
          id: data.nextID,
          name,
          recipes: [recipe].filter(Boolean),
        },
      };

      return new ItemMap({
        map: newItems,
        nextID: data.nextID + 1,
      });
    }
  }

  getAll(): Set<Item> {
    return new Set(this.map.values());
  }

  get(id: ItemID): Item {
    const item = this.map.get(id);

    if (item == null) {
      throw new Error("Item is not defined");
    }

    return item;
  }

  getRandom(): Item {
    const values = Array.from(this.map.values());
    const i = Math.floor(Math.random() * values.length);
    return values[i];
  }

  getRecipe(unsortedRecipe: ItemRecipe): Item | undefined {
    const items = Array.from(this.map.values());
    const recipe = unsortedRecipe.sort();

    for (const item of items) {
      if (item.recipes.some((r) => r[0] === recipe[0] && r[1] === recipe[1])) {
        return item;
      }
    }

    return;
  }

  export(): ItemMapData {
    return {
      nextID: this.nextID,
      map: Object.fromEntries(
        Array.from(this.map.entries()).map(([itemID, item]) => [
          itemID,
          item.export(),
        ]),
      ),
    };
  }
}
