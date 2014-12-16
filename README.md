node-object-utils
=================

Set of utilities for working with hash data structures in JavaScript.

Methods
=======

look(obj, prop)
---------------

Lookup hash properties by string.

Example:

    var _ = require('node-object-utils')
      , assert = require('assert')

    var obj = {
      foo: 'bar',
      baz: ['bug']
    }

    assert.deepEqual(_.look(obj, 'foo'), 'bar')
    assert.deepEqual(_.look(obj, 'baz.0'), 'bug')
    assert.deepEqual(_.look(obj, 'missing.prop'), undefined)

transform(target, schema)
-------------------------

Transform target object using transformation schema.

Example:

    var _ = require('node-object-utils')

    var target = {
      user: {
        name: 'David',
        screen_name: 'djelic'
      },
      networks: {
        twitter: 'http://twitter.com/djelich',
        github: 'http://github.com/djelic'
      },
      number: 2
    }

    var userSchema = {
      name: 'user.name',
      info: {
        username: 'user.screen_name',
        urls: ['networks.github', 'networks.twitter']
      },
      num: function (obj) {
        return obj.number * 2
      }
    }

    var user = _.transform(target, userSchema)
    console.log(user)

Outputs:

    {
      name: 'David',
      info: {
        username: 'djelic',
        urls: [
          'http://github.com/djelic',
          'http://twitter.com/djelich'
        ]
      },
      num: 4
    }

without(src, props)
-------------------

Return object without specific properties.

Example:

    var _ = require('node-object-utils')

    var user = {
      id: '123',
      user: 'djelic',
      password: 'hashed password'
    }

    user = _.without(user, 'password')
    // or
    user = _.without(user, ['password'])
    // or
    user = _.without(user, { password: 1 })

    console.log(user)

Outputs:

    {
      id: '123',
      user: 'djelic'
    }

Installation
============

To install with [npm](http://github.com/isaacs/npm):

    npm install node-object-utils

To run the tests with [mocha](https://github.com/mochajs/mocha):

    mocha
