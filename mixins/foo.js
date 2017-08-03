'use strict'

const _ = require('lodash')

_.mixin({ sayFoo: function(){ 
  console.log('This is FOO')
}})

module.exports = _