'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Retrieve all the methods in a specified object
 *
 * @param   {object}  object    Object to retrieve method names from
 * @return  {array|boolean}     Array of method names or false if an invalid object was provided
 * @example
 *      _.getObjectMethods( Date )      // ["now", "parse", "UTC"]
 *      _.getObjectMethods( Number )    // ["isFinite", "isInteger", "isNaN", "isSafeInteger", "parseFloat", "parseInt"]
 *      _.getObjectMethods( ()=>{} ) )  // []
 *      _.getObjectMethods( 'test' ) )  // false
 *      _.getObjectMethods( 123 ) )     // false
 *      _.getObjectMethods( null ) )    // false
 */
function getObjectMethods( object ) {
    //return getObjectProperty( object, 'function' )
    
    if ( _.isNil( object ) || ! _.isObject( object ) )
        return false

    return Object.getOwnPropertyNames( object )
        .filter( p => _.isFunction( object[ p ] ) )
}

module.exports = getObjectMethods
