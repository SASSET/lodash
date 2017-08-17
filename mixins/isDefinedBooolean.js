'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated boolean value
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is a boolean and is not empty
 * @example
 *      _.isDefinedBoolean( true )   // true
 *      _.isDefinedBoolean( false )  // true
 *      _.isDefinedBoolean( 'true' ) // false
 *      _.isDefinedBoolean( 1 )      // false
 *      _.isDefinedBoolean( null )   // false
 *      _.isDefinedBoolean(  )       // false
 */
function isDefinedBoolean( value ){
    return ! _.isNil( value ) && _.isDefinedType( 'boolean', value )
}

module.exports = isDefinedBoolean
