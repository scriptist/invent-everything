import React, { useEffect, useState } from "react";
import Item from "../items/Item";
import ItemMap from "../items/ItemMap";
import { getOrDefault, save } from "../items/Storage";
import RandomItemMixer from "./RandomItemMixer";

export default function App() {
  const [items, setItems] = useState(() => getOrDefault());

  // Save items to localStorage
  useEffect(() => {
    save(items);
  }, [items]);

  return (
    <>
      {Array.from(items.getAll()).map((item) => (
        <ItemDisplay items={items} item={item} key={item.id} />
      ))}

      <RandomItemMixer
        addItem={(baseItemData) => setItems(items.addItem(baseItemData))}
        items={items}
      />
    </>
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
