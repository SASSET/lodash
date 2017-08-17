'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Determine if a specified value is a float/decimal or not
 *
 * @param   {*}         value   Value to check
 * @param   {boolean}   strict  When enabled, this will return true if the value is only a float otherwise, 
 *                              an integer returns true as well
 * @todo    Fix the strict parameter
 * @return  {boolean}
 * @example 
 *  _.isFloat( 1.3 )        // true
 *  _.isFloat( .3 )         // true
 *  _.isFloat( 123 )        // true
 *  _.isFloat( 123, true )  // false
 *  _.isFloat( 'test' )     // false
 */
function isFloat( value, strict ){
    // If value specified isn't a float..
    if ( parseFloat( value ) !== value )
        return false

    // If value IS an integer, and strict is enabled, return false
    if ( strict && parseInt( value ) === value ) 
        return false

    // Otherwise, its true!
    return true
}

module.exports = isFloat
