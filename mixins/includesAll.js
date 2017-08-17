'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Verify that a collection (string, array or object) has all listed values, basically
 * just an array-friendly version of _.includes
 *
 * @name        module:_.includesAll
 * @function    module:_.includesAll
 * @memberof    module:_
 * @param       {(array|object|string)} collection  The collection to search
 * @param       {mixed}                 values      The value or values to search for
 * @param       {number}                fromIndex   The index to search from.
 * @returns     {boolean}   Returns `true` based on the result of _.includes
 * @example 
 *  _.includesAll( [1,2,3], [1,3] )
 *  // => true
 *  _.includesAll( [1,2,3], [1,2], 2 )
 *  // => false
 *  _.includesAll( {user: 'fred', age: 40 }, ['fred', 40] )
 *  // => true
 *  _.includesAll( 'abcdef', ['a','d] )
 *  // => true
 */
function includesAll ( collection, values, fromIndex ) {
    // Make sure we were given an array as the collection
    if( ! _.isArray( collection ) && ! _.isObject( collection ) && ! _.isString( collection ) ){
        throw new Error( '_.includesAll: Expecting an array, string or object as the collection' )
    }

    if( _.isUndefined( values ) || _.isNull( values ) ){
        throw new Error( '_.includesAll: Need a value to check for' )
    }

    // Default this to 0
    fromIndex = _.isNumber( fromIndex ) ? Number( fromIndex ) : 0

    // If were given an array, then iterate through the collection
    if( _.isArray( values ) ){
        return _.every( values, v => _.includes( collection, v, fromIndex ) )
    }

    // If we are NOT given an array for the values, then just hand everything down to the
    // _.includes, according to the documentation, it can accept "anything" as the value
    // (But it doesn't work as expected when given an array), hence this function
    return _.includes( collection, values, fromIndex )
}

module.exports = includesAll
