'use strict'

const _      = require( 'lodash' )
const path   = require( 'path' )
const debug  = require( 'debug' )
const crypto = require( 'crypto' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

_d( 'Included the mixin script "%s"',mixin  )
_d( 'Included the mixin script "%s"', path.basename( __filename ) )

/**
 * Generate a hash of a given string, using the provided salt
 *
 * @name        module:_.hash
 * @function    module:_.hash
 * @memberof    module:_
 * @param       {string}    str     String to hash
 * @param       {string}    salt    Salt to use for hash
 * @returns     {string}    base64 encoded hash
 * @example 
 *  _.hash('superSecretPassword','secret-salt')
 *  // => ebA3UZET3LDQWzl <cut> TUnV5oRxAvOLsA==
 */
 //  openssl list-message-digest-algorithms
function hash ( str, salt, algo ) {
    if ( algo ){
        if ( ! _.isString( algo ) )
            throw new Error('_.hash() was given an invalid algorythm value')
    }
    else {
        algo = 'base64'
    }


    if( ! _.isString( str ) || ! _.isString( salt ))
        throw new Error('_.hash() requires two string parameters, a string to hash and a salt')

    const h = crypto.createHash('sha512')

    h.update(str)
    h.update(salt)

    return h.digest( algo )
}

module.exports = hash