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
 * @name        module:_.toCase
 * @function    module:_.toCase
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @example _.toCase( ?? )
 *              // => ??
 */
//function toCase(){}

module.exports = require('to-case')
