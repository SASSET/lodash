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
 * @name        module:_.flipLeet
 * @function    module:_.flipLeet
 * @memberof    module:_
 * @param       
 * @returns     {??}    ???
 * @example _.flipLeet( ?? )
 *              // => ??
 */
function flipLeet(){
    var results = []

    _.each( _internals.leet, ( charArr, alphaChar ) => {
        _.each( charArr, ( char, charIdx ) => {
            results.push({
                letter: alphaChar,
                leet: char
            })
        })
    })

    return results
}

module.exports = flipLeet