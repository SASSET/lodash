'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Convert any new-line characters to HTML Line breaks, which can optionally be specified,
 * but defaults to just </br>. The replaced characters consists of \r\n, \n\r, \n and \r.
 *
 * @name        module:_.nl2br
 * @function    module:_.nl2br
 * @memberof    module:_
 * @param       {string}    str             String to process and replace any new lines for
 * @param       {string}    [br='</br>']    HTML Break (</br> by default)
 * @returns     {string}    Modified version of ${str}, with all new-line characters replaced with an HTML line break
 * @todo    Another parameter to optionally trim the string before line breaks to get rid of first/last
 * @todo    Another parameter to keep the \n on the end of the newly added </br> tag
 * @example 
 *  _.nl2br("One\r\nTwo\n\rThree\nFour\rFive")
 *  // => One</br>Two</br>Three</br>Four</br>Five
 */
function nl2br ( str, br ) {
    return str.split(/\r\n|\n\r|\n|\r/).join( br || '</br>' )
}

module.exports = nl2br
