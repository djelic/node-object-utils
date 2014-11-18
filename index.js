'use strict';


function look(obj, key) {
  if (!obj || !key) return;
  var segs = key.split('.');
  while (segs.length) {
    obj = obj[segs.shift()];
    if (!obj) return;
  }
  return obj;
}

function transform(src, schema) {
  if (!src || !schema) return;
  var obj = {};
  function _transform(val) {
    switch (typeOf(val)) {
      case 'object':
        return transform(src, val);
      case 'array':
        return val.map(_transform);
      case 'function':
        return val.call(obj, src);
      default:
        return look(src, val);
    }
  }
  Object.keys(schema).forEach(function (key) {
    obj[key] = _transform(schema[key]);
  });
  return obj;
}

function typeOf(e) {
  return Object.prototype.toString.call(e)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

exports.look = look;
exports.transform = transform;
exports.typeOf = typeOf;
