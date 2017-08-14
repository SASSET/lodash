'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Determine if a specified word is in the English language
 *
 * @param   {string}    word    Word to check  
 * @return  {boolean}
 * @example
 *      _.isEnglishWord( 'car' )    // true
 *      _.isEnglishWord( 'adios' )  // false
 */
function isEnglishWord( word ){
    if ( ! word || ! _.isString( word ) )
        return false

    var words = require('./data/en-words')
    return words.indexOf( word.toLowerCase().trim() ) !== -1
}

module.exports = isEnglishWord