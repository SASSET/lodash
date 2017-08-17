'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated numeric value
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is a number and is not empty 
 * @example
 *      _.isDefinedNumber( 123 )   // true
 *      _.isDefinedNumber( 1.2 )   // true
 *      _.isDefinedNumber( 0.5 )   // true
 *      _.isDefinedNumber( '0.5' ) // false
 *      _.isDefinedNumber( {} )    // false
 *      _.isDefinedNumber( Date )  // false
 */
function isDefinedNumber( value ){
    return ! _.isNil( value ) && _.isDefinedType( 'number', value )
}

module.exports = isDefinedNumber
