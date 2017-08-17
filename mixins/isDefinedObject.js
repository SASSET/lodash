'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated object
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is an object and is not empty
 * @example
 *      _.isDefinedObject( {a:1} )        // true
 *      _.isDefinedObject( new Date() )   // true
 *      _.isDefinedObject( function(){} ) // true
 *      _.isDefinedObject( {} )           // false
 *      _.isDefinedObject( [1,2] )        // false
 */
function isDefinedObject( value ){
    return ! _.isNil( value ) && _.isDefinedType( 'object', value )
}

module.exports = isDefinedObject
