'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided with a function
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is a function and is not empty
 * @example
 *      _.isDefinedFunction( function(){} ) // true
 *      _.isDefinedFunction( () => {} ) )   // true
 *      _.isDefinedFunction( console )      // true
 *      _.isDefinedFunction( console.log )  // true
 *      _.isDefinedFunction( ' ' )          // false
 *      _.isDefinedFunction( 123 )          // false
 */
function isDefinedFunction( value ){
    return ! _.isNil( value ) && _.isDefinedType( 'function', value )
}


module.exports = isDefinedFunction
