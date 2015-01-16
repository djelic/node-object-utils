'use strict';

// Module dependencies.
var _ = require('..')
  , assert = require('assert');


var obj = {
  a: 'first',
  b: {
    b1: 'nested'
  },
  c: [1, '2', {
    c1: 'arr nested'
  }]
};

describe('utils', function () {
  describe('look', function () {
    it('should return undefined when called with no arguments', function () {
      assert.deepEqual(_.look(), undefined);
    });

    it('should be able to lookup property', function () {
      assert.deepEqual(_.look(obj, 'a'), obj.a);
    });

    it('should be able to lookup nested property', function () {
      assert.deepEqual(_.look(obj, 'b.b1'), obj.b.b1);
    });

    it('should be able to lookup array member', function () {
      assert.deepEqual(_.look(obj, 'c.0'), obj.c[0]);
      assert.deepEqual(_.look(obj, 'c.1'), obj.c[1]);
    });

    it('should be able to lookup nested array member', function () {
      assert.deepEqual(_.look(obj, 'c.2.c1'), obj.c[2].c1);
    });
  });


  describe('transform', function () {
    it('should be able to transform using simple schema', function () {
      var res = _.transform(obj, {
        x: 'a',
        y: 'b.b1'
      });
      assert.deepEqual(res.x, obj.a);
      assert.deepEqual(res.y, obj.b.b1);
    });

    it('should be able to transform using nested schema', function () {
      var res = _.transform(obj, {
        x: {
          x1: 'a',
          x2: 'c.2.c1'
        }
      });
      assert.deepEqual(res.x.x1, obj.a);
      assert.deepEqual(res.x.x2, obj.c[2].c1);
    });

    it('should be able to transform to array', function () {
      var res = _.transform(obj, {
        x: ['a', { x1: 'b', x2: 'c.2' }]
      });
      assert.deepEqual(res.x[0], obj.a);
      assert.deepEqual(res.x[1].x1, obj.b);
      assert.deepEqual(res.x[1].x2, obj.c[2]);
    });

    it('should be able to transform using function', function () {
      var res = _.transform(obj, {
        x: function (obj) {
          return obj.a + ' ' + obj.b.b1;
        }
      });
      assert.deepEqual(res.x, obj.a + ' ' + obj.b.b1);
    });

    it('should be able to transform using function with context set to new object', function () {
      var res = _.transform(obj, {
        x: 'b.b1',
        y: function () {
          return this.x.toUpperCase();
        }
      });
      assert.deepEqual(res.y, obj.b.b1.toUpperCase());
    });
  });


  describe('without', function () {
    it('should be able to return object without properties given as string', function () {
      var res = _.without(obj, 'a b');
      assert.deepEqual(res.a, undefined);
      assert.deepEqual(res.b, undefined);
      assert.deepEqual(res.c, obj.c);
    });

    it('should be able to return object without properties given as array', function () {
      var res = _.without(obj, ['a', 'b']);
      assert.deepEqual(res.a, undefined);
      assert.deepEqual(res.b, undefined);
      assert.deepEqual(res.c, obj.c);
    });

    it('should be able to return object without properties given as object', function () {
      var res = _.without(obj, { a: 1, b: 1 });
      assert.deepEqual(res.a, undefined);
      assert.deepEqual(res.b, undefined);
      assert.deepEqual(res.c, obj.c);
    });

    it('should be able to return object when called without props', function () {
      var res = _.without(obj);
      assert.deepEqual(res.a, obj.a);
      assert.deepEqual(res.b, obj.b);
      assert.deepEqual(res.c, obj.c);
    });
  });


  describe('typeOf', function () {
      var tests = {
        'undefined': undefined,
        'string': 'string',
        'number': 12345,
        'array': [],
        'object': {},
        'regexp': /^$/
      };
      Object.keys(tests).forEach(function (type) {
        it('should be able to get type of '+type, function () {
          assert.deepEqual(_.typeOf(tests[type]), type);
        });
      });


  describe('pluck', function () {
    var col = [{ id: 1 }, { id: 2 }, { c: 3 }];
    it('should be able to pluck property from collection', function () {
      assert.deepEqual(_.pluck(col, 'id'), [1, 2]);
    });
  });
});
