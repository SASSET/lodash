'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Just a boolean comparison tool, Allows you to specify other true-type
 * variables, as well as convert the value to lower case (Since the string
 * representations of the boolean values are lower). Also compares integer
 * values
 *
 * @name        module:_.bool
 * @function    module:_.bool
 * @memberof    module:_
 * @param       {(string|boolean|integer)}  value           Value to compare
 * @param       {(array|string)}            trues           Any other custom 'true' type variables, an attempt is made 
 *                                                          to convert any  value to an array
 * @param       {boolean}                   [lower=false]   Process the values after toLowerCase() is called
 * @returns     Boolean casted version of the provided value
 * @example 
 *  _.bool( true ) === true
 *  _.bool( 'true' ) === true
 *  _.bool( 1 ) === true
 *  _.bool( 'foo', [ 'foo', 'bar' ] ) === true
 *  _.bool( '1' ) === true
 *  _.bool( 'false' ) === false
 *  _.bool( false ) === false
 *  _.bool( 0 ) === false
 *  _.bool( '0' ) === false
 *  _.bool( 'foo', [ 'bar', 'baz' ] ) === false
 */
function bool ( value, trues, lower ) {
    if( _.isUndefined( trues ) ){
        trues = []
    }
    else if(_.isString( trues )){
        trues = [ trues ]
    }
    else if( ! _.isArray( trues )){
        throw new Error( `Illegal additional true types, must be string or array, received: ${getType(trues)}`)
    }

    trues = _.union( [ 1, '1', true, 'true' ], trues )

    return _.indexOf( trues, !!lower === true ? value.toLowerCase() : value ) !== -1
}

module.exports = bool
