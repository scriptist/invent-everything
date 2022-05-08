import { ItemMapData } from "./ItemMap";
import ItemMap from "./ItemMap";

const key = "invent-anything-element-map";

export function save(itemMap: ItemMap): void {
  const data = itemMap.export();
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
}

export function get(): ItemMap | undefined {
  const json = localStorage.getItem(key);

  if (json == null) {
    return;
  }

  const data: ItemMapData = JSON.parse(json);
  return new ItemMap(data);
}

export function getOrDefault(): ItemMap {
  const mapFromStorage = get();

  if (mapFromStorage != null) {
    return mapFromStorage;
  }

  let itemMap = new ItemMap();

  ["Air", "Earth", "Fire", "Water"].forEach(
    (name) => (itemMap = itemMap.addItem({ name, recipe: null })),
  );

  return itemMap;
}
