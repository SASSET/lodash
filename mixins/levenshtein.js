'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Use the Levenshtein formula to calculate the distance in the similarities
 * of two separate strings, which can be anywhere from 0 (strings are identical)
 * to the length of the longer string provided (100% different). The higher the
 * distance, the more different the strings are, but the distance can only be
 * as high as high as the number of characters in the longer string
 *
 * @name        module:_.levenshtein
 * @function    module:_.levenshtein
 * @memberof    module:_
 * @param       {(string|number)}    strA    String A
 * @param       {(string|number)}    strB    String .... Yep, B
 * @returns     {number}            Levenshtein distance value
 * @note        ALPHA PHASE - Under Construction
 * @todo    Create unit tests
 * @example 
 *  levenshtein( 'foo','foo' )
 *  // => 0
 *  levenshtein( 'foo','bar' ) 
 *  // => 3
 */
function levenshtein ( strA, strB ) {
    // Make sure we were given Strings or Numbers, and nothing else
    if( ( _.isString( strA ) && ! _.isString( strA ) ) || ( _.isNumber( strB ) && ! _.isNumber( strB ) ) )
        throw new Error( 'Need to provide two strings or numbers to differentiate')

    const cost = []
    const n = strA.length
    const m = strB.length
    let i
    let j

    if ( n === 0 || m === 0 ){
        return
    }

    for ( i = 0; i <= n; i++ ) {
        _.set( cost, `[${i}][0]`, i )
    }

    for ( j = 0; j <= m; j++ ) {
        cost[0][j] = j
    }
    //console.log('cost',cost)

    for ( i = 1; i <= n; i++ ) {
        let x = strA.charAt(i - 1)

        for ( j = 1; j <= m; j++ ) {
            let y = strB.charAt(j - 1)

            if ( x == y ) {
                cost[i][j] = cost[i - 1][j - 1]
            }
            else {
                cost[i][j] = 1 + _.minOf( cost[i - 1][j - 1], cost[i][j - 1], cost[i - 1][j] )
            }
        }

    }

    return cost[n][m]
}

module.exports = levenshtein