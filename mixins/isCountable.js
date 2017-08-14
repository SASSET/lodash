'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Description...
 *
 * @name        module:_.isCountable
 * @function    module:_.isCountable
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @example _.isCountable( ?? )
 *              // => ??
 */
function isCountable( noun ){
    return ! _.includes( _internals.uncountable, noun )
}

module.exports = isCountable
