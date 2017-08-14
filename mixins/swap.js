'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Swap the keys and values of a simple plain object
 *
 * @name        module:_.swap
 * @function    module:_.swap
 * @memberof    module:_
 * @param       {object}    obj     Object to swap values for
 * @returns     {object}    Returns a version of the original object with the keys and values switched (wherever possible)
 * @example 
 *  _.swap({a:'b', c:'d'})
 *  // => {b:'a', d:'c'}
 */
function swap ( obj ) {
  if( ! _.isPlainObject( obj ) )
    throw new Error(`Only plain objects can be swapped, you gave us a ${getType(obj)}`)
    
  const result = {}

  _.forEach(obj, ( v, k ) => {
    result[v] = k
  })

  return result
}

module.exports = swap
