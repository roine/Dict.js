import Dict from './../index'

describe('Dict', () => {

  describe('options', () => {

    describe('key', () => {

      it('changes the key of the dict', () => {
        let key = 'identifier'
        const dict = new Dict(key)
        expect(dict.get(1, [{[key]: 1, name: 'jon'}])).
          toEqual({[key]: 1, name: 'jon'})
        expect(
          dict.insert({[key]: 2, name: 'sophie'}, [{[key]: 1, name: 'jon'}])).
          toEqual([{[key]: 1, name: 'jon'}, {[key]: 2, name: 'sophie'}])
        expect(dict.update(1, (item) => {
          if (item) {
            return {...item, name: 'sophie'}
          }
          else {
            return item
          }
        }, [{[key]: 1, name: 'jon'}])).toEqual([{[key]: 1, name: 'sophie'}])
      })
    })
  })

  describe('insert', () => {

    it('adds data in the Dict', () => {
      const dict = new Dict()
      let newArr = dict.insert({id: 1}, [])
      expect(newArr).toEqual([{id: 1}])
    })

    it('overwrite the existing one if any', () => {
      const dict = new Dict()
      let newArr = dict.insert({id: 1, name: 'sophie'}, [{id: 1, name: 'jon'}])
      expect(newArr).toEqual([{id: 1, name: 'sophie'}])
    })
  })

  describe('get', () => {

    it('gets the item from the dict if it exists', () => {
      const dict = new Dict()
      const item = dict.get(1, [{id: 1, name: 'jon'}])
      expect(item).toEqual({id: 1, name: 'jon'})
    })

    it('returns undefined if the id does not exist', () => {
      const dict = new Dict()
      const item = dict.get(2, [{id: 1, name: 'jon'}])
      expect(item).toEqual(undefined)
    })
  })

  describe('update', () => {

    it('updates the dict', () => {
      const dict = new Dict()
      expect(dict.update(1, (item) => {
        if (item) {
          return {...item, name: 'sophie'}
        }
        else {
          return item
        }
      }, [{id: 1, name: 'jon'}])).toEqual([{id: 1, name: 'sophie'}])
    })

    it('doesn\'t update the dict if we return nothing', () => {
      const dict = new Dict()
      expect(dict.update(2, (item) => {
        if (item) {
          return {...item, name: 'sophie'}
        }
        else {
          return item
        }
      }, [{id: 1, name: 'jon'}])).toEqual([{id: 1, name: 'jon'}])
    })

    it('updates the dict if not found but return new item', () => {
      const dict = new Dict()
      expect(dict.update(2, (item) => {
        if (item) {
          return {...item, name: 'sophie'}
        }
        else {
          return {id: 2, name: 'sophie'}
        }
      }, [{id: 1, name: 'jon'}])).
        toEqual([{id: 1, name: 'jon'}, {id: 2, name: 'sophie'}])
    })
  })

  describe('remove', () => {

    it('removes an item from the dict', () => {
      const dict = new Dict()
      expect(dict.remove(1, [{id: 1, name: 'jon'}])).toEqual([])
    })

    it('keeps the dict intact if nothing is found', () => {
      const dict = new Dict()
      expect(dict.remove(2, [{id: 1, name: 'jon'}])).
        toEqual([{id: 1, name: 'jon'}])
    })
  })
})