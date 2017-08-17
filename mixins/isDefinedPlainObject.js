'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated __ value
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is a ___ and is not empty
 * @example
 *      _.isDefinedPlainObject( {a:1} )         // true
 *      _.isDefinedPlainObject( {} )            // false
 *      _.isDefinedPlainObject( () => {} ) )    // false
 *      _.isDefinedPlainObject( function(){} )  // false
 *      _.isDefinedPlainObject( new Date() )    // false
 *      _.isDefinedPlainObject( function(){} )  // false
 *      _.isDefinedPlainObject( {} )            // false
 *      _.isDefinedPlainObject( [1,2] )         // false
 */
function isDefinedPlainObject( value ){
    return ! _.isNil( value ) && _.isDefinedType( 'PlainObject', value )
}

module.exports = isDefinedPlainObject
