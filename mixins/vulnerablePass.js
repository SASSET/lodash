'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Function to check if the password contains any of the strings listed 
 * in exports.password.blacklist
 *
 * @param   {string}        value       Password to check
 * @param   {string,object} criteria   
 *
 * @example
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', 'casesensitive;exactMatch' ) // or..
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', [ 'casesensitive', 'exactMatch' ] ) // or..
 *  _.vulnerablePass( '%^(password)8*^&', { casesensitive: true, exactMatch: true } )
 *      // => false (password is not vulnerable) 
 *
 * @example
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', { casesensitive: false, exactMatch: false } ) // or..
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', '!casesensitive;!exactMatch' ) // or..
 *  _.vulnerablePass( '%^(PaSsWoRd)8*^&', [ '!casesensitive', '!exactMatch' ] )
 *      // => true (password is vulnerable because it contains "password") 
 *
 * @example
 *  _.vulnerablePass( 'p@s$w0rd', { fromleet: true, exactMatch: true } ) // or..
 *  _.vulnerablePass( 'p@s$w0rd', [ 'fromleet', 'exactMatch' ] ) // or..
 *  _.vulnerablePass( 'p@s$w0rd', 'fromleet;exactMatch' )
 *      // => true (password is vulnerable because its just a l33t form of 'password') 
 */
function vulnerablePass( value, criteria ){

}

module.exports = vulnerablePass