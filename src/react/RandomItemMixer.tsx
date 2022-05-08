import React, { useCallback, useEffect, useState } from "react";
import { ItemRecipe } from "../items/Item";
import ItemMap, { AddItemData } from "../items/ItemMap";

interface Props {
  addItem: (elementData: AddItemData) => void;
  items: ItemMap;
}

export default function RandomItemMixer({ addItem, items }: Props) {
  const [recipe, setRecipe] = useState<ItemRecipe>(() =>
    getRandomNewRecipe(items),
  );

  const randomizeRecipe = useCallback(
    () => setRecipe(getRandomNewRecipe(items)),
    [items],
  );

  useEffect(randomizeRecipe, [randomizeRecipe]);

  const [itemName, setItemName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (itemName === "") {
          randomizeRecipe();
          return;
        }

        addItem({
          name: itemName,
          recipe,
        });

        setItemName("");
      }}
    >
      {items.get(recipe[0]).name} + {items.get(recipe[1]).name} ={" "}
      <input
        autoFocus
        onChange={(e) => setItemName(e.target.value)}
        value={itemName}
      />
    </form>
  );
}

// Helpers

function getRandomNewRecipe(items: ItemMap): ItemRecipe {
  while (true) {
    const recipe = randomRecipe(items);

    if (items.getRecipe(recipe) == null) {
      return recipe;
    }
  }
}

function randomRecipe(items: ItemMap): ItemRecipe {
  return [items.getRandom().id, items.getRandom().id];
}
