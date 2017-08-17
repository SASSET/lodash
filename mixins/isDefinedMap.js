'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the value provided is a populated map value
 *
 * @param   {*} value   Value to check  
 * @return  {boolean}   true if the value is a map and is not empty 
 * @example
 *      var m = new Map()
 *      _.isDefinedMap( m )             // false
 *      m.set( 'foo', 'bar' )
 *      _.isDefinedMap( m )             // true
 *      m.delete( 'foo' )
 *      _.isDefinedMap( m )             // false
 *      _.isDefinedMap( new Weakmap() ) // false
 *      _.isDefinedMap( 123 )           // false
 *      _.isDefinedMap( '' )            // false
 *      _.isDefinedMap( {a:1} )         // false
 */
function isDefinedMap( value ){
    return ! _.isNil( value ) &&  _.isDefinedType( 'map', value )
}


module.exports = isDefinedMap
