'use strict'

const _ = require('lodash')

_.mixin({ sayBar: function(){ 
  console.log('This is BAR')
}})

module.exports = _