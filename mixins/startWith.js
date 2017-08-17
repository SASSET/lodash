'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Ensure a specific string starts with a certain character
 *
 * @name        module:_.startWith
 * @function    module:_.startWith
 * @memberof    module:_
 * @param       {string}    str         String to parse and modify (if needed)
 * @param       {string}    startChar   String to check for on the beginning, and possibly append
 * @returns     {string}    The string returned will be either the exact same string provided, or ${startChar + str} if 
 *                          the original string doesn't begin with the startChar character
 * @example 
 *  _.startWith('Documents/', '~/')
 *  // => ~/Documents/
 *  _.startWith('Something else.', '.')
 *  // => Something else.
 *  _( 'Using startsWith and endsWith together' )
 *  .startWith('(')
 *  .endWith(')')
 *  .value()
 *  // => (Using startsWith and endsWith together)
 */
function startWith ( str, startChar ) {
    return _.startsWith( str, startChar )
        ? str
        : startChar + str
}

module.exports = startWith
