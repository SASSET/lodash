'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return the minimum value of all arguments passed. This is the same thing as _.min,
 * only instead of an array, it takes all the arguments
 *
 * @name        module:_.minOf
 * @function    module:_.minOf
 * @memberof    module:_
 * @var         {array} arguments   Pulls the arguments provided
 * @todo        Create unit tests
 * @returns     {number}    Minimum value, retrieved by _.min()
 * @example
 *  _.minOf( 1, 20, 'a', ['test'], 1000 )
 *  // => 1
 */
function minOf() {
    return _.min( _.chain( arguments ).map(n => Number( n ) ).value() )
}

module.exports = minOf
