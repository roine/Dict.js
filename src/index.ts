/**
 * The type of the key.
 */

export type DictKey = string;

/**
 * The type of dictionary's entries.
 */
export type DictEntry = { [key: string]: any };

/**
 * The type of the dictionary.
 */
export type Dict = DictEntry[];

export class Dictionary {
  // make these read only for consumer
  key: DictKey = 'id';
  dict: Dict = [];

  constructor(arr: Dict) {
    this.dict = arr;
    return this;
  }

  static fromArray(arr: Dict) {
    if (!Array.isArray(arr)) {
      throw new Error(
        `You need to construct a Dict from an array, instead you used ${arr}`
      );
    }
    return new Dictionary(arr);
  }

  toArray() {
    return this.dict;
  }

  setKey(k: DictKey) {
    this.key = k;
    return this;
  }

  insert(newVal: DictEntry) {
    if (!newVal[this.key]) {
      return this;
    }
    this.remove(newVal[this.key]);
    this.dict = [...this.dict, newVal];
    return this;
  }

  remove(id: DictKey) {
    this.dict = this.dict.filter(item => item[this.key] !== id);
    return this;
  }

  update(id: DictKey, fn: (item?: DictEntry) => DictEntry) {
    const shouldUpdate = fn(this.get(id));
    if (shouldUpdate) {
      this.insert(shouldUpdate);
    }
    return this;
  }

  get(id: DictKey): DictEntry | undefined {
    return this.dict.find(item => item[this.key] === id);
  }
}
