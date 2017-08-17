'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )


/**
 *
 * @todo Add: Error, Element, Finite, Integer, PlainObject, ObjectLike, RegExp, SafeInteger, Set, Symbol, TypedArray
 */
function isDefinedType( type, value ){
    if ( _.isNil( type ) )
        return false

    type = _.chain( type )
        .replace(' ', '')
        //.toLower()
        .trim()
        .value()

    var fnName = 'is' + _.upperFirst( type ),
        fnObj

    // Determine which function should be used; defaults to `_.is${type}` (EG: type date is _.isDate )
    switch( fnName ){
        case 'isFloat':
            fnObj = isFloat
            break
        default:
            if ( _.has( _, fnName ) )
                fnObj = _[ fnName ]
            break
    }
   
    // If no function was found with the name `_.is${type}`, then return false
    if ( ! _.isFunction( fnObj ) )
        return false

    var isType = fnObj( value )

    if ( ! isType )
        return false

    switch( type.toLowerCase() ){
        case 'function':
        case 'string':
        case 'boolean':
        case 'float':
        case 'date':
        case 'number':
        //case 'weakmap':
            return ! _.isEmpty( _.trim( _.toString( value ) ) ) 
            break
        case 'map':
            return typeof value.size === 'number' && value.size > 0
            break
        case 'object':
        case 'plainobject':
        case 'array':
            return ! _.isEmpty( value ) 
            break

        case 'weakmap':
            throw new Error( '[isDefinedType] Unable to determine if WeakMap is populated (WeakMaps have no size/length/count method)' )
            break

        default:
            console.log('Unknown type:',type)
            return 
            break
    }    

    return isType && ! _.isEmpty( _.trim(_.toString(value)) ) 
}

module.exports = isDefinedType
