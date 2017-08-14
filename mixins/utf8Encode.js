'use strict'

const _     = require( 'lodash' )
const path  = require( 'path' )
const debug = require( 'debug' )

const mixin = path.basename( __filename ).replace( /\.js$/, '' )

const _d = debug( `sasset:lodash:${mixin}` )

_d( 'Included the mixin script "%s"',mixin  )

/**
 * Encodes an ISO-8859-1 string to UTF-8, this is meant to provide the same functionality
 * as the PHP utf8_encode function.
 *
 * @name        module:_.utf8Encode
 * @function    module:_.utf8Encode
 * @memberof    module:_
 * @param       {string}    str     Standard ISO-8859-1 encoded string
 * @returns     {string}    UTF-8 encoded version of the str param value
 * @example _.utf8Encode('Hello World')
 *              // => Hello World
 */
function utf8Encode ( str ) {
    if ( _.isNull( str ) || _.isUndefined( str ) || str === '' )
        return str

    if( ! _.isString( str ) && ! _.isNumber( str ))
        throw new Error( `Illegal value type given to utf8Encode, expected a ISO-8859-1 encoded string, but received a ${typeof str}` )

    const string = (str + '') // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    let utftext = '',
        stringl = 0,
        start, end

    start = end = 0
    stringl = _.size( string )
    for (let n = 0; n < stringl; n++) {
        let c1 = string.charCodeAt(n)
        let enc = null

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode(
                (c1 >> 6) | 192, (c1 & 63) | 128
            );
        } else if ((c1 & 0xF800) != 0xD800) {
            enc = String.fromCharCode(
                (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            )
        } else { // surrogate pairs
            if ((c1 & 0xFC00) != 0xD800)
                throw new RangeError('Unmatched trail surrogate at ' + n)

            var c2 = string.charCodeAt(++n)
            if ((c2 & 0xFC00) != 0xDC00)
                throw new RangeError('Unmatched lead surrogate at ' + (n - 1))

            c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
            enc = String.fromCharCode(
                (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
            )
        }
        if ( ! _.isNull( enc )) {
            if (end > start)
                utftext += string.slice(start, end)

            utftext += enc
            start = end = n + 1
        }
    }

    if (end > start)
        utftext += string.slice(start, stringl)

    return utftext
}

module.exports = utf8Encode