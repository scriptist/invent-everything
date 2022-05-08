import { ElementMapData } from "./ElementMap";
import ElementMap from "./ElementMap";

const key = "invent-anything-element-map";

export function save(elementMap: ElementMap): void {
  const data = elementMap.export();
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
}

export function get(): ElementMap | undefined {
  const json = localStorage.getItem(key);

  if (json == null) {
    return;
  }

  const data: ElementMapData = JSON.parse(json);
  return new ElementMap(data);
}

export function getOrDefault(): ElementMap {
  const mapFromStorage = get();

  if (mapFromStorage != null) {
    return mapFromStorage;
  }

  const elementMap = new ElementMap();

  ["Air", "Earth", "Fire", "Water"].forEach((name) =>
    elementMap.addElement({ name, parents: null }),
  );

  return elementMap;
}
