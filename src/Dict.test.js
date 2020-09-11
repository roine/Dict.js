const { Dictionary: Dict } = require('.');

describe('Dict', () => {
  describe('constructor', () => {
    it('constructs from an empty array', () => {
      const arr = [];
      const dict = Dict.fromArray(arr);
      expect(dict.toArray()).toBe(arr);
    });

    it('constructs from an array', () => {
      const arr = [{ id: 1, name: 'Jon' }];
      const dict = Dict.fromArray(arr);
      expect(dict.toArray()).toEqual(arr);
    });

    it('doesnt construct from undefined/null', () => {
      expect(() => Dict.fromArray(undefined)).toThrow();
      expect(() => Dict.fromArray(null)).toThrow();
    });
  });

  describe('setKey', () => {
    it('sets the Dict key', () => {
      const arr = [{ country: 'France', population: 2 }];
      const dict = Dict.fromArray(arr).setKey('country');
      expect(dict.key).toBe('country');
    });
  });

  describe('insert', () => {
    let arr, dict;
    beforeEach(() => {
      arr = [{ country: 'France', population: 2 }];
      dict = Dict.fromArray(arr).setKey('country');
    });

    it('inserts a new entry', () => {
      dict.insert({ country: 'Deutschland', population: 3 });
      expect(dict.toArray()).toEqual([
        { country: 'France', population: 2 },
        { country: 'Deutschland', population: 3 },
      ]);
    });
    it('override an entry if existing', () => {
      dict.insert({ country: 'France', population: 30 });
      expect(dict.toArray()).toEqual([{ country: 'France', population: 30 }]);
    });
    it('adds nothing if key is missing/mismatching', () => {
      dict
        .insert('hello')
        .insert({ id: 1, name: 'jon' })
        .insert({ name: 'Jon' });
      expect(dict.toArray()).toEqual([{ country: 'France', population: 2 }]);
    });
  });
  describe('remove', () => {
    let arr, dict;
    beforeEach(() => {
      arr = [
        { id: 'France', population: 2 },
        { id: 'Italia', population: 6 },
      ];
      dict = Dict.fromArray(arr);
    });
    it('removes an entry', () => {
      dict.remove('Italia');
      expect(dict.toArray()).toEqual([{ id: 'France', population: 2 }]);
    });

    it('does nothing if entry doesnt exist', () => {
      dict.remove('Detschland');
      expect(dict.toArray()).toEqual([
        { id: 'France', population: 2 },
        { id: 'Italia', population: 6 },
      ]);
    });
  });

  describe('update', () => {
    let arr, dict;
    beforeEach(() => {
      arr = [{ id: 1, name: 'jon' }];
      dict = Dict.fromArray(arr);
    });

    it('updates the dict', () => {
      dict.update(1, item => ({ ...item, name: 'sophie' }));
      expect(dict.toArray()).toEqual([{ id: 1, name: 'sophie' }]);
    });

    describe('function', () => {
      it('updates the dict if entry exists', () => {
        dict.update(1, item => {
          if (item) {
            return { ...item, name: 'sophie' };
          } else {
            return item;
          }
        });
        expect(dict.toArray()).toEqual([{ id: 1, name: 'sophie' }]);
      });

      it("doesn't update the dict if the entry doesnt exists", () => {
        dict.update(2, item => {
          if (item) {
            return { ...item, name: 'sophie' };
          } else {
            return item;
          }
        });
        expect(dict.toArray()).toEqual([{ id: 1, name: 'jon' }]);
      });
    });

    it('insert new item if entry doesnt exist, otherwise update', () => {
      dict.update(
        2,
        item => {
          if (item) {
            return { ...item, name: 'sophie' };
          } else {
            return { id: 2, name: 'sophie' };
          }
        },
        [{ id: 1, name: 'jon' }]
      );
      expect(dict.toArray()).toEqual([
        { id: 1, name: 'jon' },
        { id: 2, name: 'sophie' },
      ]);
    });
  });
  describe('get', () => {
    let arr, dict;
    beforeEach(() => {
      arr = [{ id: 1, name: 'jon' }];
      dict = Dict.fromArray(arr);
    });

    it('gets a Dict entry', () => {
      expect(dict.get(1)).toEqual({ id: 1, name: 'jon' });
    });

    it('returns undefined if entry doesnt exist', () => {
      expect(dict.get(2)).toEqual(undefined);
    });
  });
});
