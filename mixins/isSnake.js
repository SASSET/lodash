'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if a specified string is in snake_case format
 *
 * @name        module:_.isSnake
 * @function    module:_.isSnake
 * @memberof    module:_
 * @param       {string}    str     String to inspect
 * @returns     {boolean}   Returns True if the string is in case snake, False otherwise.
 * @note        ALPHA PHASE - Under Construction
 * @example
 *  _.isSnake( _.snakeCase('Foo Bar') )
 *  // => true
 *  _.isSnake( _.camelCase('Foo Bar') )
 *  // => false
 */
function isSnake ( str ) {
    return str === _.snakeCase( str )
}

module.exports = isSnake
