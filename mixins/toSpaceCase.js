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
 * @name        module:_.toSpaceCase
 * @function    module:_.toSpaceCase
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @source  https://github.com/ianstormtaylor/to-space-case/blob/master/index.js
 * @example _.toSpaceCase( ?? )
 *              // => ??
 */

module.exports = _.toCase.space
