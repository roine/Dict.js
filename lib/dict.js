// @flow

/**
 * The type of the key.
 */
export type KeyType = (string | number)

/**
 * The type of dictionary's entries.
 */
type DictItemType = { [string]: KeyType }

/**
 * The type of the dictionary.
 */
type DictType = Array<DictItemType>

/**
 * @class
 * @classdesc The Dict class
 */
class Dict {
  /**
   * The key to access the dictionary
   */
  key: string = 'id'
  /**
   * The array used as a dictionary
   */
  arr: DictType = []

  /**
   *
   */
  constructor (arr: DictType, key: ?KeyType): void {
    this.arr = arr
    if (key) {
      this.key = key
    }
  }

  /**
   * Insert object into a dictionary. Replaces value when there is a collision.
   *
   * @example
   * let dict = new Dict([{id: 1, name: 'jon'}])
   * dict.insert({id: 2, name: 'sophie'})
   * // => [{id: 1, name: 'jon'}, {id: 2, name: 'sophie'}]
   * dict.insert({id: 1, name: 'sophie'})
   * // => [{id: 1, name: 'sophie'}]
   *
   */
  insert (newVal: DictItemType): DictType {
    if (!newVal[this.key]) {
      return this.arr
    }
    const newArr = this.remove(newVal[this.key])
    return [...newArr, newVal]
  }

  /**
   * Update the object in the dictionary for a specific key with a given function.
   *
   * @example
   * let dict = new Dict([{id: 1, name: 'jon'}])
   * dict.update(1, (item) => {
   *    if (item) {
   *      return {...item, name: 'sophie'}
   *    }
   *    else {
   *      return item
   *    }
   *  })
   * // => [{id: 1, name: 'sophie'}]
   */
  update (id: KeyType, fn: (?DictItemType => ?DictItemType)): DictType {
    const shouldUpdate = fn(this.get(id))
    if (shouldUpdate) {
      return this.insert(shouldUpdate)
    } else {
      return this.arr
    }
  }

  /**
   * Get the object associated with a key. If the key is not found, return undefined.
   * This is useful when you are not sure if a key will be in the dictionary.
   *
   * @example
   * const dict = new Dict([{id: 1, name: 'jon'}])
   * dict.get(1)
   * // {id: 1, name: 'jon'}
   */
  get (id: KeyType): ?DictItemType {
    return this.arr.find(item => item[this.key] === id)
  }

  /**
   * Remove an object from a dictionary.
   * If the key is not found, no changes are made.
   *
   * @example
   * const dict = new Dict([{id: 1, name: 'jon'}])
   * dict.remove(1)
   * // []
   */
  remove (id: KeyType): DictType {
    return this.arr.filter(item => item[this.key] !== id)
  }

  /**
   * Access the array
   */
  toArray (): DictType {
    return this.arr
  }
}

export default Dict