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
 * @name        module:_.determineCase
 * @function    module:_.determineCase
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @source  https://github.com/ianstormtaylor/case/blob/master/lib/index.js
 * @example _.determineCase( ?? )
 *              // => ??
 */
function determineCase( string ){
  for (var key in cases) {
    if (key == 'none') continue;
    var convert = cases[key];
    if (convert(string) == string) return key;
  }
  return null;
}

module.exports = determineCase
