'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

var hasSpace = /\s/
var hasSeparator = /(_|-|\.|:)/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Description...
 *
 * @name        module:_.toNoCase
 * @function    module:_.toNoCase
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @source    https://github.com/ianstormtaylor/to-no-case/blob/master/index.js
 * @example _.toNoCase( ?? )
 *              // => ??
 */

module.exports = _.toCase.none