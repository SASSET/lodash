'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Validate a string against an RFC822 compliant pattern
 *
 * @name        module:_.isEmail
 * @function    module:_.isEmail
 * @memberof    module:_
 * @param       {string}    email   Email address to validate against pattern
 * @returns     {boolean}
 * @example
 *  _.isEmail( 'j@linux.com' ) 
 *  // => true
 *
 *  _.isEmail( 'j@linux.c' ) 
 *  _.isEmail( 'jinux.com' ) 
 *  _.isEmail( null )  
 *  // => false
 */
function isEmail ( email ) {
    // Must be a string!
    if( ! _.isString( email ) ){
        return false
    }

    // Verify the length (using min/max standards)
    if( email.length < 4 || email.length > 255 ){
        return false
    }

    // Only RFC822 compliant pattern that would work with JS
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email )
}

module.exports = isEmail
