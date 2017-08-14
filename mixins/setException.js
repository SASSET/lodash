'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Ensures the item is an instance of the exception specified by type
 *
 * @name        module:_.setException
 * @function    module:_.setException
 * @memberof    module:_
 * @param       {Mixed}     item            Item/Error/Whatever
 * @param       {Mixed}     [type=Error]    Exception type (Default: Error)
 * @returns     {Mixed}     Returns an instance of Error, or whatevers specified by item
 * @example 
 *  let err = 'Error Str'
 *  // => Error Str
 *  err = _.setException( err )
 *  // => [Error: Error Str]
 *  err = _.setException( err )
 *  // => [Error: Error Str]
 *  // Notice no matter how many times its used, Error is not nested, as opposed to setting new Error( err )
 */
function setException( item, type ){
    if( _.isUndefined( type ) ){
        type = Error
    }

    return item instanceof type
        ? item
        : new type( item )
}

module.exports = setException
