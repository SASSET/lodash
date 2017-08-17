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
 * @name        module:_.escapeRegexp
 * @function    module:_.escapeRegexp
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @source  https://www.npmjs.com/package/escape-regexp-component
 * @example _.escapeRegexp( ?? )
 *              // => ??
 */
function escapeRegexp( str ){
  return _.toString( str ).replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1')
}

module.exports = escapeRegexp
