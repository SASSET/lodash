'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated string value
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is a string and is not empty
 * @example
 *      _.isDefinedString( 'test' )  // true
 *      _.isDefinedString( ' ' )     // false
 *      _.isDefinedString( 123 )     // false
 *      _.isDefinedString( '123' )   // true
 */
function isDefinedString( value ){
    return ! _.isNil( value ) && _.isDefinedType( 'string', value )
}

module.exports = isDefinedString
