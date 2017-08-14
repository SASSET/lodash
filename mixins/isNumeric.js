'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Check if the provided number is a float or integer value. This just tacks
 * a 2nd check onto lodashes isNumber, which uses a lenient comparative operator
 * to check if the value of Number is the same as the provided number
 *
 * @name        module:_.isNumeric
 * @function    module:_.isNumeric
 * @memberof    module:_
 * @param       {(string|integer|number)}   num     Number to check
 * @returns     {boolean}
 * @example
 *  _.isNumber( 123 )  
 *  _.isNumber( '123' )
 *  _.isNumber( 1.2 )  
 *  _.isNumber( '1.2' )
 *  // => true
 *
 *  _.isNumber( 'foo' )
 *  _.isNumber( [] )   
 *  _.isNumber( {} ) 
 *  // => false
 */
function isNumeric ( num ) {
    return _.isNumber( num ) || Number( num ) == num
}

module.exports = isNumeric