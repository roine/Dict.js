// @flow

/**
 * The type of the key.
 */
type KeyType = (string | number)

/**
 * The type of dictionary's entries.
 */
type DictItemType = { [string]: KeyType }

/**
 * The type of the dictionary.
 */
type DictType = Array<DictItemType>

/**
 * If you need to set another key than `id` use the constructor you can
 * instanciate the Dict like that `new Dict('uid')`.
 *
 * @example
 * const dict = new Dict('name')
 * dict.get('jon', [{id: 1, name: 'jon'}, {id: 2, name: 'sophie'}])
 * // {id: 1, name: 'jon'}
 */
class Dict {

  key: string = 'id'

  constructor (key: ?KeyType): void {
    if (key) {
      this.key = key
    }
  }

  /**
   * Insert object into a dictionary. Replaces value when there is a collision.
   *
   * @example
   * let dict = new Dict()
   * dict.insert({id: 2, name: 'sophie'}, [{id: 1, name: 'jon'}])
   * // => [{id: 1, name: 'jon'}, {id: 2, name: 'sophie'}]
   * dict.insert({id: 1, name: 'sophie'}, [{id: 1, name: 'jon'}])
   * // => [{id: 1, name: 'sophie'}]
   *
   */
  insert (newVal: DictItemType, arr: DictType): DictType {
    if (!newVal[this.key]) {
      return arr
    }
    const newArr = this.remove(newVal[this.key], arr)
    return [...newArr, newVal]
  }

  /**
   * Update the object in the dictionary for a specific key with a given function.
   *
   * @example
   * let dict = new Dict()
   * dict.update(1, (item) => {
   *    if (item) {
   *      return {...item, name: 'sophie'}
   *    }
   *    else {
   *      return item
   *    }
   *  }, [{id: 1, name: 'jon'}])
   * // => [{id: 1, name: 'sophie'}]
   */
  update (
    id: KeyType, fn: (?DictItemType => ?DictItemType),
    arr: DictType): DictType {
    const shouldUpdate = fn(this.get(id, arr))
    if (shouldUpdate) {
      return this.insert(shouldUpdate, arr)
    } else {
      return arr
    }
  }

  /**
   * Get the object associated with a key. If the key is not found, return undefined.
   * This is useful when you are not sure if a key will be in the dictionary.
   *
   * @example
   * const dict = new Dict()
   * dict.get(1, [{id: 1, name: 'jon'}])
   * // {id: 1, name: 'jon'}
   */
  get (id: KeyType, arr: DictType): ?DictItemType {
    return arr.find(item => item[this.key] === id)
  }

  /**
   * Remove an object from a dictionary.
   * If the key is not found, no changes are made.
   *
   * @example
   * const dict = new Dict()
   * dict.remove(1, [{id: 1, name: 'jon'}])
   * // []
   */
  remove (id: KeyType, arr: DictType): DictType {
    return arr.filter(item => item[this.key] !== id)
  }
}

module.exports = Dict;