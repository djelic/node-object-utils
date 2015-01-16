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

function without(src, props) {
  if (!src || !props) return src;
  switch (typeOf(props)) {
    case 'string':
      props = props.split(' ').map(function (prop) {
        return prop.trim();
      });
      break;
    case 'object':
      props = Object.keys(props);
      break;
  }

  return Object.keys(src).reduce(function (obj, key) {
    if (!~props.indexOf(key)) obj[key] = src[key];
    return obj;
  }, {});
}

function typeOf(e) {
  return Object.prototype.toString.call(e)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

function pluck(arr, prop) {
  return (arr || []).reduce(function (memo, e) {
    e[prop] && memo.push(e[prop]);
    return memo;
  }, []);
}

exports.look = look;
exports.transform = transform;
exports.without = without;
exports.typeOf = typeOf;
exports.pluck = pluck;
