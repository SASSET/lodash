'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return the maximum value of all arguments passed. This is the same thing as _.max,
 * only instead of an array, it takes all the arguments
 *
 * @name        module:_.maxOf
 * @function    module:_.maxOf
 * @memberof    module:_
 * @var         {array} arguments   Pulls the arguments provided
 * @todo    Create unit tests
 * @returns     {number}    Maximum value, retrieved by _.max()
 * @example
 *  _.maxOf( 1, 20, 'a', ['test'], 1000 )
 *  // => 1000
 */
function maxOf() {
    return _.max( _.chain( arguments ).map( n => Number( n ) ).value() )
}

module.exports = maxOf
