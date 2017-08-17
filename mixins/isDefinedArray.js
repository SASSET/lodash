'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated array
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is an array and is not empty
 * @example
 *      _.isDefinedArray( [1,2] ) // true
 *      _.isDefinedArray( [] )    // false
 *      _.isDefinedArray( 'foo' ) // false
 *      _.isDefinedArray(  )      // false
 */
function isDefinedArray( value ){
    return ! _.isNil( value ) &&  _.isDefinedType( 'array', value )
}

module.exports = isDefinedArray
