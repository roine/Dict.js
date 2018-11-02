"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The type of the key.
 */

/**
 * The type of dictionary's entries.
 */

/**
 * The type of the dictionary.
 */

/**
 * If you need to set another key than `id` use the constructor you can
 * instanciate the Dict like that `new Dict('uid')`.
 *
 * @example
 * const dict = new Dict('name')
 * dict.get('jon', [{id: 1, name: 'jon'}, {id: 2, name: 'sophie'}])
 * // {id: 1, name: 'jon'}
 */
var Dict =
/*#__PURE__*/
function () {
  function Dict(key) {
    _classCallCheck(this, Dict);

    _defineProperty(this, "key", 'id');

    if (key) {
      this.key = key;
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


  _createClass(Dict, [{
    key: "insert",
    value: function insert(newVal, arr) {
      if (!newVal[this.key]) {
        return arr;
      }

      var newArr = this.remove(newVal[this.key], arr);
      return _toConsumableArray(newArr).concat([newVal]);
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

  }, {
    key: "update",
    value: function update(id, fn, arr) {
      var shouldUpdate = fn(this.get(id, arr));

      if (shouldUpdate) {
        return this.insert(shouldUpdate, arr);
      } else {
        return arr;
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

  }, {
    key: "get",
    value: function get(id, arr) {
      var _this = this;

      return arr.find(function (item) {
        return item[_this.key] === id;
      });
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

  }, {
    key: "remove",
    value: function remove(id, arr) {
      var _this2 = this;

      return arr.filter(function (item) {
        return item[_this2.key] !== id;
      });
    }
  }]);

  return Dict;
}();

var _default = Dict;
exports.default = _default;
