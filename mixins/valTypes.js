'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Retrieve the types of values in an array or an object. 
 *
 * @name        module:_.valTypes
 * @alias       module:_.valueTypes
 * @function    module:_.valTypes
 * @memberof    module:_
 * @param       {(Object|array)}    collection  Array or object (collection of data).
 * @param       {?function=}         filter      Filter the collection using a simple function
 * @returns     {array}                         Array of types of values in the collection
 *
 * @example // Example showing how duplicate value types only display the value type once
 *  _.valTypes([ 
 *      1, 'Str', false, [], null, new Array(), undefined, {}, 
 *      new Date(), function(){}, (s => `This is a ${s}`)('str')
 *  ]).join(', ').join(', ')
 *  // => number, string, boolean, array, null, undefined, object, date, function
 *
 * @example // Using Gizmo.valueTypes to verify all parameters are string types
 *  function onlyAcceptsStringParams( foo, bar, baz, bang ){
 *      var invalidParamTypes = Gizmo.valTypes( arguments, f => ! _.isString(f) )
 *      if( invalidParamTypes.length > 0 ) 
 *          throw new Error( 'Expected ll parameters to be strings - received invalid type(s): ' + invalidParamTypes.join(', ') ) 
 *  }
 */
function valTypes( collection, filter ){ 

    if( _.isObject( collection ) ){
        collection = _.values( collection )
    }
    else if( ! _.isArray( collection ) ){
        throw new Error( `Helper function valTypes expected an object or array for the collection value - received type: ${_.type(collection)}` )
    }

    var chain = _.chain( collection )

    if( _.isFunction( filter ) ){
        chain = chain.filter( filter )
    }

    return chain
        //.map( v => _.lowerCase( _.typeof( v ) ) )
        .map( _.typeof )
        .map( _.lowerCase )
        .uniq()
        .value() 
}

module.exports = valTypes
