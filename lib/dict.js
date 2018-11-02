// @flow

type DictKeyType = (string | number)

type DictItemType = { [string]: DictKeyType }

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

  insert (newVal: DictItemType): DictType {
    if (!newVal[this.key]) {
      return this.arr
    }
    const newArr = this.remove(newVal[this.key])
    return [...newArr, newVal]
  }

  update (id: DictKeyType, fn: (?DictItemType => ?DictItemType)): DictType {
    const shouldUpdate = fn(this.get(id))
    if (shouldUpdate) {
      return this.insert(shouldUpdate)
    } else {
      return this.arr
    }
  }

  get (id: DictKeyType): ?DictItemType {
    return this.arr.find(item => item[this.key] === id)
  }

  remove(id: DictKeyType): DictType {
    return this.arr.filter(item => item[this.key] !== id)
  }

  toArray() {
    return this.arr
  }

}

export default Dict