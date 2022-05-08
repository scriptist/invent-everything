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

  return (
    <div className={styles.root}>
      <RandomItemMixer
        addItem={(baseItemData) => setItems(items.addItem(baseItemData))}
        items={items}
      />
      {Array.from(items.getAll())
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
    padding: 12px;
  `,
};
