'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Retrieve the properties of a specified object, returning all property names, or just the names of the properties 
 * of the type(s) specified
 *
 * @param   {Object}        object      Object to retrieve property names from
 * @param   {array|string}  propTypes   The property types to retrieve (array, string, object, etc) (Nil is all types)
 * @return  {array|null}    Array of property names, or null
 * @example
 *      var Hi = function( f, l, s ){ 
 *          this.first = f
 *          this.last = l
 *          this.status = !!s
 *      }
 *  
 *      Hi.prototype.fullname = () => `${this.first} ${this.last}`
 *  
 *      var hi_a = new Hi( 'John', 'Doe', false )
 *  
 *      _.getObjectProperty( Hi )
 *          // ["length", "name", "arguments", "caller", "prototype"]
 *      _.getObjectProperty( hi_a )
 *          // ["first", "last", "status"]
 *      _.getObjectProperty( hi_a, 'boolean' )
 *          // ["status"]
 *      _.getObjectProperty( hi_a, ['function','boolean'] )
 *          // ["status"]
 *      _.getObjectProperty( hi_a, ['string','boolean'] )
 *          // ["first", "last", "status"]
 *      _.getObjectProperty( hi_a, ['number'] )
 *          // null
 */
function getObjectProperty( object, propTypes ) {
    if ( _.isNil( object ) || ! _.isObject( object ) )
        return false

    var allProps = Object.getOwnPropertyNames( object ),
        result = []

    if ( ! _.isNil( propTypes ) && _.isString( propTypes ) )
        propTypes = [ propTypes ]

    // Iterate over the objects properties
    _.each( allProps, prop => {
        // If no property types are defined, then add all types
        if ( _.isNil( propTypes ) ){
            result.push( prop )
        }

        // If it IS defined, and this property type is specified, then add it
        //else if ( propTypes.indexOf( prop.constructor.name.toLowerCase() ) !== -1 ) {
        else if ( 
            _.isObjectLike( object )
            && _.isFunction( object[ prop ].constructor )
            && _.has( object[ prop ].constructor, 'name') // Check if object.prop.constructor has name
            && propTypes.indexOf( object[ prop ].constructor.name.toLowerCase() ) !== -1 
            ) {
            result.push( prop )
        }
        
    })

    return _.isEmpty( result ) ? null : result
}

module.exports = getObjectProperty
