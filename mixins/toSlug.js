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
 * @name        module:_.toSlug
 * @function    module:_.toSlug
 * @memberof    module:_
 * @param       {string}          string                String to transform into slug
 * @param       {string|object}   options               Options...
 * @param       {string}          options.replacement   Primary replacement character (default is -) Must be a single character
 * @param       {boolean}         options.lower         Convert slug to lower case 
 * @param       {boolean}         options.upper         Convert slug to upper case (Setting lower AND upper to null will preserve the original case)
 * @param       {number}          options.limit         Slug character limit
 * @param       {boolean}         options.trim          If true, then the options.replace value will be trimmed off the result
 * @param       {array|function}  options.unique        Can be an array of existing slugs, or a function to check if a slug is unique
 * @returns     {string}    Slug value
 * @see   https://confluence.atlassian.com/bitbucket/what-is-a-slug-224395839.html
 * @see   https://github.com/simov/slugify
 * @example _.toSlug( ?? )
 *              // => ??
 */
function toSlug( string, options ){
  options = ( typeof options === 'string' )
    ? { replacement: options }
    : options || {}

  // Assign default options
  options = _.defaults( options, {
    replacement: '-',
    lower: true,
    upper: false,
    trim: true
  })

  if ( options.replacement.toString().length > 1 )
    throw new Error( "Replacement character is greater than one character in length" )

  const charMap = _.reduce( _internals.charmap, ( result, value, key ) => {
    _d(`Loading ${Object.keys(value).length} characters for ${key} character set`)
    return _.merge( result, value )
  }, {} )

  string = string.split('')
    .reduce(function (result, ch) {
      if (charMap[ch]) 
        ch = charMap[ch]

      // allowed
      ch = ch.replace( options.remove || /[^\w\s$*_+~.()'"!\-:@]/g, '' )

      result += ch
      return result
    }, '')
    // trim leading/trailing spaces
    .replace( /^\s+|\s+$/g, '' )
    // convert spaces
    .replace( /[-\s]+/g, options.replacement )
    // remove trailing separator
    .replace( '#{replacement}$', '' )

  if ( options.lower )
    string = string.toLowerCase()

  if ( options.upper )
    string = string.toUpperCase()

  if ( _.isNumber( options.limit ) )
    string = string.substr( 0, options.limit )

  if ( options.trim )
    string = string
      .replace( RegExp( '^'+options.replacement+'*' ), '' )
      .replace( RegExp( options.replacement+'*$' ), '' )

  return string
}

module.exports = toSlug
