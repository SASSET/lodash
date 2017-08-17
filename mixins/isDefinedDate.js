'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated date value
 *
 * @param   {*}         value   Value to check  
 * @param   {boolean}   parse   If true and the value fails _.isDate(value), then it will be ran through 
 *                              Date.parse() to check if its a valid date
 * @return  {boolean}   true if the value is a date and is not empty
 * @example
 *      var d = new Date()
 *      _.isDefinedDate( d )                  // true
 *      _.isDefinedDate( d.toString() )       // false
 *      _.isDefinedDate( d.toString(), true ) // true
 *      _.isDefinedDate( ' ' )                // false
 *      _.isDefinedDate( 123 )                // false
 */
function isDefinedDate( value, parse ){
    if ( _.isNil( value ) ) return false

    if (  _.isDefinedType( 'date', value ) ) return true

    // If parse is enabled, then try to run it through Date.parse(), if the result 
    // is a valid number, then assume its a valid/populated date
    if ( parse ){
        var parsed = Date.parse( _.isString( value ) )
        return ! _.isNaN( parsed )
    }

    return false
}

module.exports = isDefinedDate
