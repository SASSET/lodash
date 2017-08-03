'use strict'

const _ = require('lodash')



/**
 * Verify a password against a password hash generated by _.passwordHash
 *
 * @name        module:_.passwordVerify
 * @function    module:_.passwordVerify
 * @memberof    module:_
 * @param       {string}    password        Password to verify
 * @param       {string}    passwdHash      String generated by _.passwordHash
 * @returns     {boolean}   TRUE if the result of a hash generated with the
 *                          same password and the salt found in passwordHash,
 *                          matches the hash inside passwordHash
 * @example 
 *  const hashA = _.passwordHash( 'secret' )
 *  _.passwordVerify( 'secret', hashA )
 *  // => true
 */
function passwordVerify ( password, passwdHash ) {
    if( ! password || ! passwdHash ){
        throw new Error('Need to provide both a password and a hash to verify')
    }

    if( ! _.isString( password ) || ! _.isString( passwdHash ) ){
        throw new Error('Password and hash both need to be strings')
    }

    // If the hash isn't even the proper length, don't bother checking
    if( passwdHash.length !== 108 ){
        return false
    }

    // Get the salt from the password hash - first 20 chars
    const salt = passwdHash.substr( 0, 20 )
    // Get the password hash, everything after the first 20 chars
    const hash = passwdHash.substr( 20 )

    // Check the hash against a hash generated with the same data
    return _.makeHash( password, salt ) === hash
}

_.mixin({
    passwordVerify: passwordVerify
})

module.exports = passwordVerify