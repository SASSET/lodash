'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Escape a string, making it safe to use in a MySQL query. Based off of PHPs
 * mysql_real_escape_string
 *
 * @name        module:_.mysqlEscape
 * @function    module:_.mysqlEscape
 * @memberof    module:_
 * @param       {string}                content     String to use in the MySQL query
 * @returns     {string}                            Safe version of the content string parameter
 * @note        ALPHA PHASE - Under Construction
 * @todo        Move the replacements and map to a data file?
 * @example
 *  _.mysqlEscape( "Justin\\\\'s Boots" )
 *  // => "Justin\\'s Boots"
 */
function mysqlEscape ( content ) {
    const replacements = [
        [ "\\", "\\\\" ],
        [ "\'", "\\\'" ],
        [ "\"", "\\\"" ],
        [ "\n", "\\\n" ],
        [ "\r", "\\\r" ],
        [ "\x00", "\\\x00" ],
        [ "\x1a", "\\\x1a" ]
    ]

    const map = {
        "\\": "\\\\",
        "\'": "\\\'",
        "\"": "\\\"",
        "\n": "\\\n",
        "\r": "\\\r",
        "\x00": "\\\x00",
        "\x1a": "\\\x1a"
    }

    return replace( content, map )

    /*return content
     .replace("\\", "\\\\")
     .replace("\'", "\\\'")
     .replace("\"", "\\\"")
     .replace("\n", "\\\n")
     .replace("\r", "\\\r")
     .replace("\x00", "\\\x00")
     .replace("\x1a", "\\\x1a")
     */
}

module.exports = mysqlEscape
