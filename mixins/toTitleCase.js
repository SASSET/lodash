'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

var escaped = _internals.titleCaseMinors.map(escape)
var minorMatcher = new RegExp('[^^]\\b(' + escaped.join('|') + ')\\b', 'ig')
var punctuationMatcher = /:\s*(\w)/g


/**
 * Description...
 *
 * @name        module:_.toTitleCase
 * @function    module:_.toTitleCase
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @example _.toTitleCase( ?? )
 *              // => ??
 */

module.exports = _.toCase.title
