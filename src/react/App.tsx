import React, { useEffect, useState } from "react";
import Item from "../items/Item";
import ItemMap from "../items/ItemMap";
import { getOrDefault, save } from "../items/Storage";
import RandomItemMixer from "./RandomItemMixer";

import { css } from "@emotion/css";

export default function App() {
  const [items, setItems] = useState(() => getOrDefault());

  // Save items to localStorage
  useEffect(() => {
    save(items);
  }, [items]);

  const allItems = items.getAll();

  const recipeCount = Array.from(allItems).reduce(
    (count, item) => count + item.recipes.length,
    0,
  );

  return (
    <div className={styles.root}>
      <h3>
        {allItems.size} items - {recipeCount} recipes
      </h3>
      <RandomItemMixer
        addItem={(baseItemData) => setItems(items.addItem(baseItemData))}
        items={items}
      />
      {Array.from(allItems)
        .reverse()
        .map((item) => (
          <ItemDisplay items={items} item={item} key={item.id} />
        ))}
    </div>
  );
}

// Helpers

interface ItemProps {
  item: Item;
  items: ItemMap;
}

function ItemDisplay({ item, items }: ItemProps) {
  return (
    <div>
      {item.name}:{" "}
      {item.recipes.map((recipe, i) => (
        <>
          {items.get(recipe[0]).name} + {items.get(recipe[1]).name}
          {i !== item.recipes.length - 1 && ", "}
        </>
      ))}
    </div>
  );
}

// Styles

const styles = {
  root: css`
    background: #111;
    color: #888;
    padding: 12px;
  `,
};
