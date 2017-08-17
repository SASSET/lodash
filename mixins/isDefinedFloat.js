'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated float (or number) value
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is a float or number and is not empty
 * @example
 *      _.isDefinedFloat( 1.2 )    // true
 *      _.isDefinedFloat( 12 )     // true
 *      _.isDefinedFloat( 'test' ) // false
 */
function isDefinedFloat( value ){
     return ! _.isNil( value ) && isDefinedType( 'float', value )
}

module.exports = isDefinedFloat
