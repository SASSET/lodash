'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if two values match each other. Basically sorts the object and
 * source, then passes it off to _.isMatch, (Since objects/arrays with
 * same values in different orders would be considered discrepancies
 *
 * @name        module:_.sortMatch
 * @function    module:_.sortMatch
 * @memberof    module:_
 * @param       {*}         object      Item A to match to B
 * @param       {*}         source      Item B to match to A
 * @param       {function=} customizer  Function to cuztomize the object and src (Just handed of to _.isMatch)
 * @returns     {boolean}
 * @example
 *  _.sortMatch( [1,2,3], [3,2,1] )
 *  // => true
 *  _.sortMatch( [1,2,'3'], [3,2,1] )
 *  // => false
 */
function sortMatch ( object, source, customizer ) {
    if( _.isUndefined( object ) || _.isUndefined( source ) ){
        throw new Error('Must define two same-type values to sort and match')
    }

    if( _.getType( object ) !== _.getType( source ) ){
        return false
    }

    if( _.isPlainObject( object )) {
        object = _.sortObj( object )
        source = _.sortObj( source )
    }
    else if( _.isArray( object )) {
        object = object.sort()
        source = source.sort()
    }
    else {
        throw new Error('test')
    }

    return _.isMatch( object, source, customizer )
}

module.exports = sortMatch
