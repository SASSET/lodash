'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Complete opposite of the _.nl2br - This replaces any HTML Line breaks with the line return character,
 * which can optionally be specified, but defaults to just \r\n. The HTML break replaced is </br>, <br>,
 * </BR> or <BR>
 *
 * @name        module:_.br2nl
 * @function    module:_.br2nl
 * @memberof    module:_
 * @param       {string}    str             String to process and replace any HTML line breaks for
 * @param       {string}    [nl='\r\n']     New line character (\r\n by default)
 * @returns     {string}    Modified version of ${str}, with all HTML line breaks replaced with new-line characters
 * @todo    Another parameter to optionally trim the string before line breaks to get rid of first/last
 * @todo    Another parameter to keep the \</br> tag on the end of the newly added \n
 * @example 
 *  _.nl2br("One<br>Two</br>Three</BR>Four<BR>Five")
 *  // => One\r\nTwo\r\nThree\r\nFour\r\nFive
 */
function br2nl ( str, nl ) {
    return str.split(/<\/?br>/i).join( nl || "\r\n" )
}

module.exports = br2nl
