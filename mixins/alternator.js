'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Alternate through the parameters provided, returning the next one in line every time.
 *
 * Instructions:
 *      - Calling alternator() with the SAME parameters will return the next param each time
 *      - Calling alternator() with NEW parameters will re-initialize the rotation, and return
 *          the first new parameter listed
 *      - Calling alternator() with NO parameters will reset the rotation to null, and return nothing
 *
 * @name        module:_.alternator
 * @function    module:_.alternator
 * @memberof    module:_
 * @var         {array}     parameters  Parameters to rotate through
 * @returns     {Mixed}     Whatever array element is next in line, or nothing when resetting
 * @todo    Create unit tests
 * @example
 *   for( let i = 0; i< 6; i++ )
 *     _.alternator('a','b','c')
 *     // returns (incrementally) : a, b, c, a, b, c
 */
function alternator() {
    // If no params are set, just reset everything, return nothing
    if( ! arguments ){
        //console.log('# A')
        _internals.alternator.i = 0
        _internals.alternator.params = null
    }

    // If this is the first time passing params, OR the params md5sum has changed
    // (meaning new params), then reset the alternator with the new params
    if( _internals.alternator.params === null || _.md5( JSON.stringify( arguments ) ) !== _internals.alternator.params ){
        //console.log('# B')
        _internals.alternator.i = 0
        _internals.alternator.params = _.md5( JSON.stringify( arguments ) )

        return arguments[ _internals.alternator.i ++ ]
    }

    // Just calling alternator again with the same params as last time..
    if( _internals.alternator.i === arguments.length ){
        _internals.alternator.i = 0
    }

    return arguments[ _internals.alternator.i ++ ]
}

module.exports = alternator
