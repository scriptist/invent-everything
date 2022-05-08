import Element, { ElementData, ElementID, ElementParents } from "./Element";

export interface ElementMapData {
  map: { [elementID: ElementID]: ElementData };
  nextID: number;
}

export default class ElementMap {
  private map: Map<ElementID, Element>;
  private nextID: number;

  constructor(data?: ElementMapData) {
    if (data == null) {
      this.map = new Map();
      this.nextID = 0;
    } else {
      this.map = new Map(
        Object.entries(data.map).map(([key, elementData]) => [
          key,
          new Element(elementData),
        ]),
      );
      this.nextID = data.nextID;
    }
  }

  addElement({
    name,
    parents,
  }: {
    name: string;
    parents: ElementParents | null;
  }): void {
    const element = new Element({
      name,
      parents,
      id: (this.nextID++).toString(),
    });

    this.map.set(element.id, element);
  }

  getElement(id: ElementID): Element {
    const element = this.map.get(id);

    if (element == null) {
      throw new Error("Element is not defined");
    }

    return element;
  }

  export(): ElementMapData {
    return {
      nextID: this.nextID,
      map: Object.fromEntries(
        Array.from(this.map.entries()).map(([elementID, element]) => [
          elementID,
          element.export(),
        ]),
      ),
    };
  }
}
