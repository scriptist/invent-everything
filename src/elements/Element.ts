export type ElementID = string;

export type ElementParents = [ElementID, ElementID];

export interface ElementData {
  id: string;
  name: string;
  parents: ElementParents | null;
}

export default class Element {
  id: ElementID;
  name: string;
  parents: ElementParents | null;

  constructor(data: ElementData) {
    this.id = data.id;
    this.name = data.name;
    this.parents = data.parents;
  }

  export(): ElementData {
    return {
      id: this.id,
      name: this.name,
      parents: this.parents,
    };
  }
}
