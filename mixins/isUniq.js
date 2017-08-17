'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Validate that an array, or objects in an array, or elements within the
 * objects in an array are all unique
 *
 * @name        module:_.isUniq
 * @function    module:_.isUniq
 * @memberof    module:_
 * @param       {array}     collection  Single level array or array of objects
 * @param       {string=}   element     If `collection` is an array of objects, and we are to check that a specific 
 *                                      element in those objects is unique, then this should be the name of the element
 *                                      in the object
 * @returns     {boolean}  
 * @example 
 *  _.isUniq( [ 1, 2, 3, 2 ] )
 *  // => false
 *  _.isUniq( [ {a: 1}, {a: 2}, {a: 1} ] ) 
 *  // => false
 *  _.isUniq( [ {a: 1, b: 2}, {a: 2, b: 5}, {a: 1, b: 2} ], 'b')
 *  // => false
 */
function isUniq ( collection, element ) {
    if( ! _.isArray( collection ) ){
        throw new Error( 'Collection needs to be an array, you provided a ' + _.getTypeof( collection ) )
    }

    if( collection.length === 0 ){
        return true
    }

    // If this is an array of objects, then handle it differently than if its just an array
    if( _.isObject( collection[0] ) ) {
        // If no specific element is provided, then uniq the entire object
        if ( _.isUndefined( element ) ) {
            return _.uniqObjs( collection ).length === collection.length
        }
        // If an element was provided, then check that just that element is unique
        return _.uniqBy( collection, element ).length === collection.length
    }

    // Here, we can just unique the array and verify the length
    return _.uniq( collection ).length === collection.length
}

module.exports = isUniq
