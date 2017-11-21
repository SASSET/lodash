'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return items true type by grabbing the 2nd string content from Object.prototype.toString.call, as opposed to the 
 * less-specific 'typeof'
 *
 * @name        module:_.getType
 * @function    module:_.getType
 * @memberof    module:_
 * @param       {*}     item    Item to retrieve type for
 * @returns     {string}    Type of variable
 * @example 
 *  _.type([])
 *  // => array
 *  _.type({})
 *  // => object
 *  _.type(() => {})
 *  // => function
 */
function getType ( item ) {
    const objType = Object.prototype.toString.call( item )

    const match = objType.match( /^\[object\s(.*)\]$/ )

    return match[1].toLowerCase()
}

module.exports = getType