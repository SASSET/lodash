'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Substitute specific characters within a string with a specified replacement.
 * Replacement positions are specified by either a single (numeric) value, or an
 * array of numeric values
 *
 * @name        module:_.replaceAt
 * @function    module:_.replaceAt
 * @memberof    module:_
 * @param       {string}            str         String to process
 * @param       {(number|array)}    indexndex   Location(s) to be substituted
 * @param       {string}            character   Character to substitute replacements with
 * @returns     {string}    Parsed/modified version of the provided string
 * @todo    Allow the character parameter to be an array, and use the alternator method to iterate through them while substituting the replacements
 * @todo    Allow the index to be a range
 * @example 
 *  _.replaceAt( 'baz', 2, 'r')
 *  // => bar
 *  _.replaceAt( 'bad-word', [1,2,5,6], '*')
 *  // => b**-w**d
 *  _.replaceAt( 'Hello World', [6,7,8,9,10] )
 *  // => Hello ?????
 */
function replaceAt ( str, index, character ) {
    character = character || '?'
    if( _.isArray( index ) ){
        return _( str )
            .map((s, i) => {
                if( _.indexOf(index, i ) === -1 ){
                    return s
                }

                return character
            })
            .value()
            .join('')
    }
    
    return str.substr(0, index) + character + str.substr(index+character.length)
}

module.exports = replaceAt