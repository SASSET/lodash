'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Description...
 *
 * @name        module:_.generateSlug
 * @function    module:_.generateSlug
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @see https://confluence.atlassian.com/bitbucket/what-is-a-slug-224395839.html
 * @example _.generateSlug( ?? )
 *              // => ??
 */
function generateSlug(){
  // https://confluence.atlassian.com/bitbucket/what-is-a-slug-224395839.html
}

module.exports = generateSlug
