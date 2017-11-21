'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return a new array containing only the unique objects inside the provided
 * array. Unlike _.uniq, this will check _every_ key/value in the array
 *
 * @name        module:_.uniqObjs
 * @function    module:_.uniqObjs
 * @memberof    module:_
 * @param       {array}     arr     Array of structurally identical objects
 * @param       {object}    arr[]   All values in the provided array need to be objects
 * @returns     {array}
 * @example
 *  // Remove any duplicate objects
 *  const objs = [ { x: 1, y: 2 }, { a: 1, b: 2 }, { x: 1, y: 2 }]
 *  console.log( _( objs ).uniqObjs().value() )
 *  console.log( _.uniqObjs( objs ) )
 *  // => [ { x: 1, y: 2 }, { a: 1, b: 2 } ]
 */
function uniqObjs ( arr ) {
    // Make sure that the arr parameter is a defined & populated array of objects
    if( ! _.isArray( arr ) || ! arr.length || ! _.isObject( arr[0] ) ){
        return false
    }

    const uniqs = []

    // Filter out the duplicate objects within the array by checking if
    // the stringified object value already exist in the temporary uniqs
    // array (while adding them to the variable)
    return _.filter( arr, ( obj ) => {
        // Use _.sortObj to sort the contents of the object by the keys, since stringify
        // will use the current order (which means identical objects in different orders
        // will be seen as discrepancies)
        if( _.indexOf( uniqs, JSON.stringify( _.sortObj( obj ) ) ) === -1 ){
            uniqs.push( JSON.stringify( _.sortObj( obj ) ) )
            return true
        }

        return false
    })
}

module.exports = uniqObjs
