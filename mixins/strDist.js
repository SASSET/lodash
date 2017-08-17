'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _internals  = require( '../data' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * String Difference Distance (In percentages). This basically returns
 * the Levenshtein value as a percentage
 *
 * @name        module:_.strDist
 * @function    module:_.strDist
 * @memberof    module:_
 * @param       {(string|number)}    strA    String A
 * @param       {(string|number)}    strB    String .... Yep, B
 * @returns     {number}            Levenshtein distance percentage (WITHOUT the % on the end)
 * @todo    Create unit tests
 * @example 
 *  strDist( 'foo','foo' )
 *  // => 0
 *  strDist( 'foo','bar' ) 
 *  // => 100
 *  strDist( 'something', 'somewhere' )
 *  // => 44.44
 */
function strDist( strA, strB ) {
    const distance = _.levenshtein( strA, strB )

    if( distance === false ){
        return false
    }

    return Number( (distance * 100) / _.maxOf( strA.length, strB.length ))
}

module.exports = strDist
