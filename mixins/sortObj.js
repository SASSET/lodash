'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return a copy of the object with the content sorted by the keys
 *
 * @name        module:_.sortObj
 * @function    module:_.sortObj
 * @memberof    module:_
 * @param       {object}    obj         Object to sort by keys
 * @param       {function}  comparator  Function to compare/sort the elements
 * @returns     {object}
 * @example
 *  const obj = {b: 3, c: 2, a: 1}
 *  console.log( _.sortObj( obj ) )
 *  console.log( _( obj ).sortObj().value() )
 *
 *  // => {a: 1, b: 3, c: 2}
 *
 *  _.sortObj( obj, ( value, key ) => value )
 *  // => {a: 1, c: 2, b: 3}
 */
function sortObj( obj, comparator ) {
    // Make sure we were given an object...
    if( ! _.isObject( obj ) ){
        throw new Error(`_.sortObj expects an object obj is: ${_.getType(obj)}`)
    }

    // If comparator is provided, then it needs to be a function, if it isn't
    // a function, then throw an error
    if( ! _.isUndefined( comparator ) && ! _.isFunction( comparator ) ){
        throw new Error(`_.sortObj expects the comparator to be a function (if defined), but received a: ${_.getType(comparator)}`)
    }

    // Create an array of the object keys, sorted either alpha/numeric
    // by default, or using the comparator if defined
    const keys = _.sortBy( _.keys( obj ), key => {
        return _.isFunction( comparator )
            ? comparator( obj[ key ], key )
            : key
    })

    // Return a newly created object which uses the keys in the array
    // created above, and grabs the associated data from the object
    // provided
    return _.zipObject( keys, _.map( keys, key => {
        return obj[ key ]
    }))
}

module.exports = sortObj

