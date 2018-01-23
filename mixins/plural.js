'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Return the plural version of a string
 *
 * @name        module:_.plural
 * @function    module:_.plural
 * @memberof    module:_
 * @param       {string}    str     Singular format of a noun
 * @returns     {string}            Plural version of same noun
 * @todo    Create unit tests
 * @example 
 *  _.plural( 'apple' )
 *  // => apples
 *  _.plural( 'toy' )
 *  // => toys
 *  _.plural( 'fly' )
 *  // => flies
 */
function plural( str ){
  if (str.lastChar() === 'y') {
    if ( (str.charAt(str.length - 2)).isVowel() ) 
      // If the y has a vowel before it (i.e. toys), then you just add the s.
      return str + 's'
        
    // If a this ends in y with a consonant before it (fly), you drop the y and add -ies to make it plural.
    return str.slice(0, -1) + 'ies'
  }
    
  if ( str.substring( str.length - 2) === 'us') 
    // ends in us -> i, needs to preceede the generic 's' rule
    return str.slice(0, -2) + 'i'
    
  if (['ch', 'sh'].indexOf( str.substring( str.length - 2)) !== -1 || ['x','s'].indexOf(str.lastChar()) !== -1) 
    // If a this ends in ch, sh, x, s, you add -es to make it plural.
    return str + 'es'

  // anything else, just add s
  return str + 's'
}

module.exports = plural