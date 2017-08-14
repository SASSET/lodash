'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

const _internals  = require( '../data' )

/**
 * Calculate the sha1 hash of a specific string. This is the equivalent of PHP's sha1()
 * function.
 *
 * @name        module:_.sha1
 * @function    module:_.sha1
 * @memberof    module:_
 * @param       {string}    str     String to calculate hash for
 * @returns     {string}    SHA1 hash
 * @example 
 *  _.sha1('test')
 *  // => a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
 */
function enDict ( word ) {
  return _internals.enWords.indexOf( word.toLowerCase().trim() ) !== -1
}

module.exports = enDict