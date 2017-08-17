'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Ensure a specific string ends with a certain character
 *
 * @name        module:_.endWith
 * @function    module:_.endWith
 * @memberof    module:_
 * @param       {string}    str         String to parse and modify (if needed)
 * @param       {string}    endChar     String to check for on the ending, and possibly append
 * @returns     {string}    The string returned will be either the exact same string provided, or ${str + endChar} if 
 *                          the original string doesn't end with the endChar character
 * @example 
 *  _.endWith('/User/john.doe/Documents', '/')
 *  // => /User/john.doe/Documents/
 *  _.endWith('Something else.', '.')
 *  // => Something else.
 */
function endWith ( str, endChar ) {
    return _.endsWith( str, endChar )
        ? str
        : str + endChar
}

module.exports = endWith
