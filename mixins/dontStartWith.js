'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Ensure a specific string DOESN'T start with a certain character
 *
 * @name        module:_.dontStartWith
 * @function    module:_.dontStartWith
 * @memberof    module:_
 * @todo Should be able to replace an starting str like // with /
 * @param       {string}    str         String to parse and modify (if needed)
 * @param       {string}    startChar   String to check for on the beginning, and possibly remove
 * @returns     {string}    The string returned will be either the exact same string provided, or a version of the 
 *                          original string with the value of startChar removed from the beginning
 * @example 
 *  _.dontStartWith('.unhide-me', '.')
 *  // => unhide-me
 */
function dontStartWith ( str, startChar ) {
    return _.startsWith( str, startChar )
        ? str.replace( new RegExp( '^'+startChar ), '')
        : str
}

module.exports = dontStartWith
