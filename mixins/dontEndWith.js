'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Ensure a specific string DOESN'T end with a certain character
 *
 * @name        module:_.dontEndWith
 * @function    module:_.dontEndWith
 * @memberof    module:_
 * @todo Should be able to replace an ending str like // with /
 * @param       {string}    str     String to parse and modify (if needed)
 * @param       {string}    endChar     String to check for on the ending, and possibly remove
 * @returns     {string}    The string returned will be either the exact same string provided, or a version of the
 *                          original string with the value of endChar removed from the end
 * @example 
 *  _.dontEndWith('/v1/resource/name/', '/')
 *  // => /v1/resource/name
 */
function dontEndWith ( str, endChar ) {
    return _.endsWith( str, endChar )
        ? str.replace( new RegExp( endChar+'$'), '')
        : str
}

module.exports = dontEndWith
