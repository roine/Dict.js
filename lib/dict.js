// @flow
/**
 * The type of the key
 */
type DictKeyType = (string | number)

/**
 * The type of the key
 */
type DictItemType = { [string]: DictKeyType }

/**
 * The type of the dictionary
 */
type DictType = Array<DictItemType>

export type KeyType = string

class Dict {
  key = 'id'
  arr = []

  constructor (arr: DictType, key: ?KeyType) {
    this.arr = arr
    if (key) {
      this.key = key
    }
  }

  /**
   * Insert object into a dictionary. Replaces value when there is a collision.
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
   */
  update (id: DictKeyType, fn: (?DictItemType => ?DictItemType)): DictType {
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
   */
  get (id: DictKeyType): ?DictItemType {
    return this.arr.find(item => item[this.key] === id)
  }

  /**
   * Remove an object from a dictionary.
   * If the key is not found, no changes are made.
   */
  remove (id: DictKeyType): DictType {
    return this.arr.filter(item => item[this.key] !== id)
  }

  toArray () {
    return this.arr
  }

}

export default Dict