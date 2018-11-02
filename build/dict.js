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

var Dict =
/*#__PURE__*/
function () {
  function Dict(arr, key) {
    _classCallCheck(this, Dict);

    _defineProperty(this, "key", 'id');

    _defineProperty(this, "arr", []);

    this.arr = arr;

    if (key) {
      this.key = key;
    }
  }

  _createClass(Dict, [{
    key: "insert",
    value: function insert(newVal) {
      if (!newVal[this.key]) {
        return this.arr;
      }

      var newArr = this.remove(newVal[this.key]);
      return _toConsumableArray(newArr).concat([newVal]);
    }
  }, {
    key: "update",
    value: function update(id, fn) {
      var shouldUpdate = fn(this.get(id));

      if (shouldUpdate) {
        return this.insert(shouldUpdate);
      } else {
        return this.arr;
      }
    }
  }, {
    key: "get",
    value: function get(id) {
      var _this = this;

      return this.arr.find(function (item) {
        return item[_this.key] === id;
      });
    }
  }, {
    key: "remove",
    value: function remove(id) {
      var _this2 = this;

      return this.arr.filter(function (item) {
        return item[_this2.key] !== id;
      });
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.arr;
    }
  }]);

  return Dict;
}();

var _default = Dict;
exports.default = _default;
